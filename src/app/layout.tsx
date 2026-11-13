import type {Metadata} from 'next';
import './globals.css';
import './editorial-v2.css';
import './case-v2.css';
import './interactions-v3.css';
import './scroll-story.css';
import {ThemeProvider} from '@/components/redesign/Theme';
import StarsField from '@/components/redesign/StarsField';
import MagneticInteractions from '@/components/redesign/MagneticInteractions';
import ScrollChoreography from '@/components/redesign/ScrollChoreography';

const siteOrigin=process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:'https://rajsuhandani.vercel.app';
export const metadata:Metadata={
 metadataBase:new URL(siteOrigin),
 title:{default:'Raj Suhandani — Developer & Creative Technologist',template:'%s | Raj Suhandani'},
 description:'Independent developer and creative technologist building thoughtful digital products, from browser-based creative tools to full-stack platforms and dimensional interfaces.',
 openGraph:{title:'Raj Suhandani | Creative Developer',description:'Some ideas don’t leave me alone. So I build them. Explore nine real digital products.',url:siteOrigin,type:'website',images:[{url:'/social-card.jpg',width:1200,height:630,alt:'Raj Suhandani’s portfolio featuring real previews of Meme Is Mine and ConvoTools'}]},
 twitter:{card:'summary_large_image',title:'Raj Suhandani | Creative Developer',description:'Some ideas don’t leave me alone. So I build them.',images:['/social-card.jpg']},
 icons:{icon:'/favicon.svg',shortcut:'/favicon.svg',apple:'/favicon.svg'},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{var v=localStorage.getItem('raj-portfolio-theme');document.documentElement.dataset.siteTheme=v==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.siteTheme='light'}"}} /></head><body><ThemeProvider><StarsField/><MagneticInteractions/><ScrollChoreography/>{children}</ThemeProvider></body></html>;
}
