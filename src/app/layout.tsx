import type {Metadata} from 'next';
import './globals.css';
import './redesign.css';

export const metadata:Metadata={
 metadataBase:new URL('https://rajsuhandani.vercel.app'),
 title:{default:'Raj Suhandani — Developer & Creative Technologist',template:'%s | Raj Suhandani'},
 description:'Independent developer and creative technologist building thoughtful digital products, from browser-based creative tools to full-stack platforms and dimensional interfaces.',
 openGraph:{title:'Raj Suhandani — Developer & Creative Technologist',description:'Thoughtful digital products. Uncommon interfaces. Engineering beyond the first impression.',url:'https://rajsuhandani.vercel.app',type:'website'},
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}
