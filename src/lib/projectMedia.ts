export function capture(slug:string,viewport:'desktop'|'mobile'='desktop'){
 return '/project-captures/'+slug+'-'+viewport+'.webp';
}
export const featuredSlugs=['memeismine','convotools','veyra','savora'] as const;
