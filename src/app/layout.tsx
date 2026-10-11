import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Raj Manish Suhandani | Developer Workspace',description:'Interactive 3D full-stack developer portfolio by Raj Manish Suhandani featuring real SaaS projects, React, Next.js, Three.js, experiences and resume.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
