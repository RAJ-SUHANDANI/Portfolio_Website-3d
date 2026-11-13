/**
 * Exercises the actual scroll choreography with animation enabled.
 * The existing check-redesign suite intentionally runs in reduced motion.
 * This catches a regression where everything looks static despite compiling.
 */
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';

const origin=process.env.AUDIT_ORIGIN||'http://127.0.0.1:3000';
const folder=path.join(process.cwd(),'.design-review');
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const assertions=[];
const errors=[];
const assert=(ok,label,details={})=>{
 assertions.push({pass:!!ok,label,...details});
 if(!ok)errors.push(label+' '+JSON.stringify(details));
};
async function section(page,selector,name,snapshot){
 const el=page.locator(selector).first();
 assert(await el.count()===1,name+' target exists');
 const before=await el.evaluate(n=>({state:n.dataset.motionState||'pending',opacity:Number(getComputedStyle(n).opacity)}));
 await el.scrollIntoViewIfNeeded({timeout:16000});
 try{
  await page.waitForFunction(sel=>{
   const target=document.querySelector(sel);
   return target instanceof HTMLElement&&target.dataset.motionState==='visible';
  },selector,{timeout:6000});
 }catch(error){
  const debug=await el.evaluate(n=>({
   state:n.dataset.motionState||'pending',
   rect:{top:n.getBoundingClientRect().top,bottom:n.getBoundingClientRect().bottom},
   opacity:getComputedStyle(n).opacity,
   clip:getComputedStyle(n).clipPath,
   active:document.documentElement.dataset.scrollMotion,
   scrollY:window.scrollY
  }));
  throw new Error('Reveal did not trigger for '+name+': '+JSON.stringify(debug),{cause:error});
 }
 await page.waitForTimeout(1250);
 const after=await el.evaluate(n=>({
  state:n.dataset.motionState,
  opacity:Number(getComputedStyle(n).opacity),
  clip:getComputedStyle(n).clipPath,
  drift:n.style.getPropertyValue('--scroll-drift')
 }));
 assert(after.state==='visible'&&after.opacity>.96,name+' scroll reveal finishes', {before,after});
 if(snapshot)await page.screenshot({path:path.join(folder,snapshot),animations:'disabled',timeout:25000});
}
async function verifyHomepage(name,viewport){
 const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'no-preference'});
 const page=await context.newPage();
 const runtime=[];
 page.on('pageerror',error=>runtime.push(error.message));
 const r=await page.goto(origin,{waitUntil:'networkidle',timeout:80000});
 assert(r?.status()===200,name+' loads');
 await page.locator('.art-preloader').waitFor({state:'hidden',timeout:10000});
 assert(await page.locator('html').getAttribute('data-scroll-motion')==='ready',name+' motion director initialized');
 const title=page.locator('#work .art-work-intro h2');
 const early=await title.evaluate(n=>({state:n.dataset.motionState||'pending',opacity:Number(getComputedStyle(n).opacity)}));
 assert(early.state!=='visible'&&early.opacity<.15,name+' below fold heading starts staged',{early});
 const sections=[
  ['#work .art-work-intro h2','work heading','motion-work-'+name+'.png'],
  ['#chapter-memeismine .art-feature-browser','Meme Is Mine preview','motion-meme-'+name+'.png'],
  ['#chapter-convotools .art-feature-browser','ConvoTools preview',null],
  ['.art-archive-heading','archive introduction',null],
  ['.art-gallery-grid .art-tile:first-child','archive tile',null],
  ['.art-note p','editorial statement','motion-statement-'+name+'.png'],
  ['.art-thinking-list article:last-child','approach list row',null],
  ['#about .art-about-photo','portrait','motion-about-'+name+'.png'],
  ['.art-experience-lines article:first-child','experience entry',null],
  ['#contact h2','contact invitation','motion-contact-'+name+'.png']
 ];
 for(const [selector,label,snapshot] of sections)await section(page,selector,name+' '+label,snapshot);
 const overflow=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 assert(overflow.scroll<=overflow.width+3,name+' no horizontal overflow after animations',overflow);
 const progress=await page.locator('.art-scroll-progress').evaluate(el=>getComputedStyle(el).transform);
 assert(progress!=='none'&&progress!=='matrix(1, 0, 0, 1, 0, 0)',name+' scroll progress responds',{progress});
 assert(runtime.length===0,name+' browser runtime has no errors',{runtime});
 await context.close();
}
async function verifyCase(){
 const context=await browser.newContext({viewport:{width:1370,height:900},reducedMotion:'no-preference'});
 const page=await context.newPage();
 const runtime=[];
 page.on('pageerror',error=>runtime.push(error.message));
 for(const slug of ['memeismine','convotools']){
  const res=await page.goto(origin+'/work/'+slug,{waitUntil:'networkidle',timeout:80000});
  assert(res?.status()===200,slug+' normal-motion case loads');
  assert(await page.locator('html').getAttribute('data-scroll-motion')==='ready',slug+' case motion initialized');
  for(const [selector,label] of [
   ['.pc-overview h2','overview heading'],
   ['.pc-narrative-grid article:first-child','challenge block'],
   ['.pc-workings-item:last-child','feature row'],
   ['.art-case-gallery figure:first-child','real screenshot gallery'],
   ['.pc-decision-grid article:first-child','engineering decision'],
   ['.pc-stack-tags>div:nth-child(2)','technology row'],
   ['.pc-explore h2','visit website call to action'],
   ['.pc-more-grid>a:first-child','related project']
  ])await section(page,selector,slug+' '+label,null);
  await page.screenshot({path:path.join(folder,'motion-case-'+slug+'.png'),animations:'disabled'});
 }
 assert(runtime.length===0,'normal-motion case pages contain no script errors',{runtime});
 await context.close();
}
async function verifyReducedMotion(){
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.goto(origin,{waitUntil:'networkidle',timeout:80000});
 const data=await page.locator('#work .art-work-intro h2').evaluate(n=>({opacity:Number(getComputedStyle(n).opacity),motion:document.documentElement.getAttribute('data-scroll-motion')}));
 assert(data.opacity===1&&data.motion!=='ready','reduced-motion users see content without staged hiding',{data});
 await context.close();
}
try{
 await verifyHomepage('desktop',{width:1440,height:900});
 await verifyHomepage('mobile',{width:390,height:844});
 await verifyCase();
 await verifyReducedMotion();
}finally{await browser.close();}
await writeFile(path.join(folder,'motion-check.json'),JSON.stringify({origin,assertions,errors},null,2)+'\n');
console.log(JSON.stringify({passed:assertions.length-errors.length,failed:errors.length,failures:errors},null,2));
if(errors.length)process.exitCode=1;
