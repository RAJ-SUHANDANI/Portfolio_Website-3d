import {profile} from '@/lib/data';
import {ArrowUpRight} from 'lucide-react';
export default function FocusSocials({className=''}:{className?:string}){
 const links=[{label:'GitHub',href:profile.github},{label:'LinkedIn',href:profile.linkedin},{label:'Email',href:'mailto:'+profile.email}];
 return <nav className={'art-focus-socials '+className} aria-label="Social links">
  {links.map(item=><a href={item.href} key={item.label} target={item.label==='Email'?undefined:'_blank'} rel={item.label==='Email'?undefined:'noopener noreferrer'}><span>{item.label}</span><ArrowUpRight size={15}/></a>)}
 </nav>;
}
