/**
 * Capture truthful, high-resolution previews of the public project websites.
 * Screenshots come from Chromium visiting the deployed URLs, not hand-drawn mocks.
 * Run in GitHub Actions (network-enabled runner): npm i --no-save playwright sharp
 * then npx playwright install --with-deps chromium.
 */
import {chromium} from 'playwright';
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';

const sites = [
  ['memeismine','https://memeismine.vercel.app/'],
  ['convotools','https://convotool.vercel.app/'],
  ['veyra','https://veyra-saas-ai.vercel.app/'],
  ['savora','https://savora-booking-engine.vercel.app/'],
  ['pulsefit','https://pulsefit-fitness.vercel.app/'],
  ['vaultiq','https://vaultiq-eight.vercel.app/'],
  ['gymspot','https://gymspot-omega.vercel.app/'],
  ['studynotion','https://studynotion-psi-three.vercel.app/'],
  ['auditai','https://audit-ai-nine-beta.vercel.app/']
];
const targetDir=path.join(process.cwd(),'public','project-captures');
await mkdir(targetDir,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const report=[];
async function capture(slug,url,kind){
 const mobile=kind==='mobile';
 const context=await browser.newContext({
  viewport:mobile?{width:420,height:912}:{width:1560,height:980},
  deviceScaleFactor:mobile?2:1.5,
  isMobile:mobile,hasTouch:mobile,
  reducedMotion:'reduce',
  colorScheme:'light',
  userAgent:mobile?'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1':undefined
 });
 const page=await context.newPage();
 try{
  const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:55000});
  if(!response || response.status()>=400)throw new Error('HTTP '+(response?.status()??'no response'));
  await page.evaluate(async()=>{await document.fonts.ready;});
  await page.waitForTimeout(mobile?2800:4300);
  await page.evaluate(()=>{document.querySelectorAll('video').forEach(v=>v.pause());});
  const title=await page.title();
  const body=(await page.locator('body').innerText({timeout:10000})).slice(0,2500);
  const bad=/Vercel Authentication|Deployment Protection|404: NOT_FOUND|500: INTERNAL_SERVER_ERROR|Application error: a client-side exception|This site can’t be reached/i;
  if(bad.test(title+' '+body.slice(0,150)))throw new Error('Website unavailable or protected: '+title);
  if(body.trim().length<35)throw new Error('Page has too little readable content ('+body.length+' characters)');
  // Page remains at its real initial scroll position; only viewport changes.
  const bytes=await page.screenshot({type:'png',animations:'disabled',caret:'hide',timeout:25000});
  const filename=slug+'-'+kind+'.webp';
  const final=await sharp(bytes).webp({quality:88,effort:5}).toBuffer();
  await writeFile(path.join(targetDir,filename),final);
  const entry={slug,kind,url,final:filename,title,response:response.status(),bytes:final.length,contentLength:body.length,ok:true};
  report.push(entry);console.log(JSON.stringify(entry));
 }catch(err){
  const entry={slug,kind,url,ok:false,error:String(err)};report.push(entry);console.error(JSON.stringify(entry));
 }finally{await context.close();}
}
for(const [slug,url] of sites){await capture(slug,url,'desktop');await capture(slug,url,'mobile');}
await browser.close();
await writeFile(path.join(targetDir,'capture-report.json'),JSON.stringify({createdAt:new Date().toISOString(),captures:report},null,2)+'\n');
const successes=report.filter(item=>item.ok).length;
console.log('Capture complete:',successes,'/',report.length,'successful');
if(successes<9)process.exitCode=1;
