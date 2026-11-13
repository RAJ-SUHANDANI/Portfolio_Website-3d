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
function contrast(foreground,background){
 const parse=s=>{const m=s.match(/\d+(?:\.\d+)?/g);return m?m.slice(0,3).map(Number):[0,0,0]};
 const lum=rgb=>rgb.map(v=>{const a=v/255;return a<=.04045?a/12.92:((a+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
 const a=lum(parse(foreground)),b=lum(parse(background));
 return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}
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
 await page.locator('.art-preloader').waitFor({state:'hidden',timeout:6500});
 const themeToggle=page.locator('.art-header .art-theme-toggle');
 await themeToggle.click();
 assert(await page.locator('html').getAttribute('data-site-theme')==='dark',name+' dark theme applies');
 const darkColor=await page.locator('.art-work').evaluate(el=>({text:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
 assert(darkColor.text!==darkColor.bg,name+' dark theme text readable');
 assert(contrast(darkColor.text,darkColor.bg)>=7,name+' dark theme core contrast is AAA');
 for(const selector of ['.art-work-intro>p','.art-archive-heading>p','.art-thinking-intro>p','.art-experience-top h2']){
  const sample=await page.locator(selector).first().evaluate(el=>({text:getComputedStyle(el).color,bg:getComputedStyle(el.closest('section')||el.parentElement).backgroundColor}));
  assert(contrast(sample.text,sample.bg)>=4.5,name+' dark theme contrast '+selector+': '+contrast(sample.text,sample.bg).toFixed(2));
 }
 if(name==='desktop')await page.screenshot({path:path.join(output,'home-dark-desktop.png'),fullPage:true,animations:'disabled'});
 await themeToggle.click();
 assert(await page.locator('html').getAttribute('data-site-theme')==='light',name+' light theme restores');
 assert(await page.locator('.art-wordmark svg path').count()===1,name+' actual vector signature visible');
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
 const memeLike=page.locator('.art-feature-meme .art-like-button');
 await memeLike.click();
 assert((await memeLike.locator('.art-like-count').innerText())==='1',name+' clicking like updates local count');
 const matchingLike=page.locator('.art-tile-memeismine .art-like-button');
 assert((await matchingLike.locator('.art-like-count').innerText())==='1',name+' duplicate project like remains in sync');
 await matchingLike.click();
 assert((await memeLike.locator('.art-like-count').innerText())==='0',name+' unlike synchronizes back to feature');
 if(name==='desktop'){
  await page.locator('#approach').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  assert(await page.locator('.art-scroll-chapter-name').innerText()==='The approach',name+' scroll phone follows current chapter');
  await page.screenshot({path:path.join(output,'scroll-phone-desktop.png'),animations:'disabled'});
  await page.locator('#intro').scrollIntoViewIfNeeded();
 }

 // Featured images must be fully visible within their real browser frames.
 for(const slug of ['memeismine','convotools']){
  const card=page.locator('.art-feature-'+(slug==='memeismine'?'meme':'convo'));
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(slug=>{
    const img=document.querySelector('.art-feature-'+(slug==='memeismine'?'meme':'convo')+' .art-feature-browser img');
    return img instanceof HTMLImageElement && img.complete && img.naturalWidth>0;
  },slug,{timeout:15000});
  const details=await card.evaluate(element=>{
    const frame=element.querySelector('.art-feature-browser');
    const picture=frame.querySelector('img');
    const stage=element.querySelector('.art-feature-shot');
    const phone=element.querySelector('.art-feature-mobile');
    const f=frame.getBoundingClientRect(),i=picture.getBoundingClientRect(),s=stage.getBoundingClientRect(),p=phone.getBoundingClientRect();
    const shown=getComputedStyle(phone).display!=='none';
    return {
      imageInsideFrame:i.left>=f.left-2&&i.right<=f.right+2&&i.top>=f.top-2&&i.bottom<=f.bottom+2,
      frameInsideStage:f.left>=s.left-2&&f.right<=s.right+2&&f.top>=s.top-2&&f.bottom<=s.bottom+2,
      phoneInsideStage:!shown||(p.left>=s.left-2&&p.right<=s.right+2&&p.top>=s.top-2&&p.bottom<=s.bottom+2),
      phoneNotCoveringImage:!shown||p.left>=f.right-2,
      fit:getComputedStyle(picture).objectFit,
      naturalWidth:picture.naturalWidth
    };
  });
  assert(details.imageInsideFrame&&details.frameInsideStage&&details.phoneInsideStage&&details.phoneNotCoveringImage&&details.fit==='contain'&&details.naturalWidth>0,
   name+' '+slug+' preview has no crop or overflow: '+JSON.stringify(details));
 }
 await page.locator('.art-features').screenshot({path:path.join(output,'featured-'+name+'.png'),animations:'disabled',timeout:30000});

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
 assert(await page.locator('.pc-title-wrap .art-like-button').count()===1,slug+' case has its own like button');
 assert(await page.locator('.art-case-header-actions .art-theme-toggle').count()===1,slug+' case theme control exists');
 if(slug==='memeismine'){
  await page.locator('.art-case-header-actions .art-theme-toggle').click();
  const sample=await page.locator('.pc-overview').evaluate(el=>({text:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
  assert(contrast(sample.text,sample.bg)>=7,slug+' dark mode case study contrast is AAA');
  await page.locator('.art-case-header-actions .art-theme-toggle').click();
 }
 await checkImage(page,'.art-case-frame img',slug+' real desktop screenshot loads');
 assert(await page.locator('.art-case-gallery figure').count()===2,slug+' two authentic screenshot captions');
 await page.getByRole('button',{name:'Phone',exact:false}).click();
 await page.waitForFunction(()=>{const image=document.querySelector('.art-case-frame img');return image instanceof HTMLImageElement && image.complete && image.naturalWidth>0;},null,{timeout:15000});
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
