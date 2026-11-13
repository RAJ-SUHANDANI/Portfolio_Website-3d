import {chromium} from 'playwright';
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';

const origin=process.env.AUDIT_ORIGIN||'http://127.0.0.1:3000';
const slugs=['memeismine','convotools','veyra','savora','pulsefit','vaultiq','gymspot','studynotion','auditai'];
const output=path.join(process.cwd(),'.design-review');
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const results=[];
const failures=[];
const assert=(condition,message)=>{if(!condition)failures.push(message);results.push({pass:!!condition,message});};
async function checkImage(page,selector,label){
 try{
  const okay=await page.locator(selector).first().evaluate(image=>image instanceof HTMLImageElement && image.complete && image.naturalWidth>0);
  assert(okay,label);
 }catch(error){assert(false,label+': '+error);}
}
async function viewportTest(name,viewport){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const response=await page.goto(origin,{waitUntil:'networkidle',timeout:90000});
 assert(response?.status()===200,name+' homepage HTTP 200');
 assert(await page.locator('.art-hero h1').count()===1,name+' hero appears');
 await checkImage(page,'.art-live-scene .art-screen-art img',name+' hero screenshot loads');
 await checkImage(page,'.art-live-scene .art-mobile-art img',name+' phone screenshot loads');
 const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 assert(overflow.scroll<=overflow.client+3,name+' has no horizontal overflow: '+overflow.scroll+'/'+overflow.client);
 const old=await page.locator('.art-live-project').innerText();
 await page.getByRole('button',{name:'Next featured project'}).click();
 const now=await page.locator('.art-live-project').innerText();
 assert(old!==now,name+' project switch works');
 await page.getByRole('button',{name:'Everything',exact:true}).click();
 assert(await page.locator('.art-gallery-grid .art-tile').count()===9,name+' lists nine real projects');
 await page.getByRole('button',{name:'Creative tools',exact:true}).click();
 assert(await page.locator('.art-gallery-grid .art-tile').count()===2,name+' filters to creative projects');
 await page.getByRole('button',{name:'Everything',exact:true}).click();
 if(name==='mobile'){
  const menu=page.getByRole('button',{name:'Open navigation'});
  await menu.click();
  assert(await page.getByRole('dialog',{name:'Menu'}).isVisible(),name+' navigation opens');
  await page.keyboard.press('Escape');
  assert(await page.getByRole('dialog',{name:'Menu'}).count()===0,name+' Escape closes menu');
 }
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:path.join(output,'home-'+name+'.png'),fullPage:true,animations:'disabled'});
 const broken=[];
 for(const slug of slugs){
  const response=await page.request.get(origin+'/project-captures/'+slug+'-desktop.webp',{timeout:15000});
  if(response.status()!==200)broken.push(slug+' ('+response.status()+')');
 }
 assert(broken.length===0,name+' all gallery screenshots load: '+broken.join(','));
 assert(errors.length===0,name+' JavaScript errors: '+errors.join(' | '));
 await context.close();
}
await viewportTest('desktop',{width:1440,height:900});
await viewportTest('mobile',{width:390,height:844});
const context=await browser.newContext({viewport:{width:1366,height:850},deviceScaleFactor:1,reducedMotion:'reduce'});
const page=await context.newPage();
for(const slug of slugs){
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const res=await page.goto(origin+'/work/'+slug,{waitUntil:'networkidle',timeout:65000});
 assert(res?.status()===200,slug+' case study HTTP 200');
 assert(await page.locator('.pc-hero h1').count()===1,slug+' case title renders');
 await checkImage(page,'.art-case-frame img',slug+' real desktop screenshot loads');
 assert(await page.locator('.art-case-gallery figure').count()===2,slug+' two authentic screenshot captions');
 await page.getByRole('button',{name:'Phone',exact:false}).click();
 await checkImage(page,'.art-case-frame img',slug+' real mobile screenshot loads');
 const mobileSrc=await page.locator('.art-case-frame img').getAttribute('src');
 assert((mobileSrc||'').endsWith(slug+'-mobile.webp'),slug+' phone toggle updates source');
 if(slug==='memeismine'){
  await page.locator('.art-case-gallery button').first().click();
  assert(await page.getByRole('dialog',{name:'Enlarged project screenshot'}).isVisible(),slug+' gallery enlarges actual image');
  await page.keyboard.press('Escape');
  assert(!(await page.getByRole('dialog',{name:'Enlarged project screenshot'}).isVisible()),slug+' Escape dismisses gallery');
  await page.screenshot({path:path.join(output,'case-memeismine.png'),fullPage:true,animations:'disabled'});
 }
 assert(errors.length===0,slug+' client runtime errors: '+errors.join(' | '));
}
await context.close();
await browser.close();
await writeFile(path.join(output,'browser-check.json'),JSON.stringify({origin,checkedAt:new Date().toISOString(),total:results.length,failed:failures.length,results},null,2)+'\n');
console.log(JSON.stringify({passed:results.length-failures.length,failed:failures.length,failures},null,2));
if(failures.length)process.exitCode=1;
