import Link from 'next/link';
import {ArrowUpRight,FileText} from 'lucide-react';
export default function ResumeHoverCard({className='',label='View resume'}:{className?:string;label?:string}){
 return <span className={'art-resume-hover '+className}>
  <Link href="/resume" className="art-resume-pill art-magnetic" aria-label="View Raj's resume in the browser"><FileText size={17}/>{label}<ArrowUpRight size={16}/></Link>
  <span className="art-resume-tooltip" aria-hidden="true">
   <span className="art-resume-tooltip-icon"><FileText size={25}/></span>
   <span><strong>The longer version.</strong><small>Experience, education, and the rest in a PDF.</small></span>
   <ArrowUpRight size={18}/>
  </span>
 </span>;
}
