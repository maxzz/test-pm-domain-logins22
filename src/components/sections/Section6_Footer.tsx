import { classNames } from '@/utils/classnames';
import React, { HTMLAttributes } from 'react';
import { IconGithubLogo } from '../UI/UIIcons';

// export function IconSiteLink({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
//     return (
//         <svg viewBox="0 0 12 12" {...rest}>
//             {title && <title>{title}</title>}
//             <text x={0} y={'50%'}>11</text>
//             <foreignObject className="w-full h-full flex items-center justify-center">
//                 <div className="text-xs">11</div>
//             </foreignObject>
//         </svg>
//     );
// }

export function IconSiteLink({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(className, 'w-[18px] h-[18px] text-xs text-yellow-100 border-yellow-100 opacity-30 border rounded-full flex items-center justify-center')} {...rest}>
            {children}
        </div>
    );
}

export function Section6_Footer() {
    return (
        <div className="px-2 py-2 flex items-center justify-between bg-[#003165]">
            <a href="https://github.com/maxzz/test-pm-domain-logins22" target="_blank">
                <IconGithubLogo className="w-5 h-5 fill-[#004997] stroke-[14] stroke-yellow-300" />
            </a>
            <div className="flex items-center space-x-1">
                <IconSiteLink>
                    <a href="https://maxzz.github.io/test-pm" target="_blank" title="5 logins">1</a>
                </IconSiteLink>
                <IconSiteLink>
                    <a href="https://maxzz.github.io/test-pm-second" target="_blank" title="ghost">2</a>
                </IconSiteLink>
                <IconSiteLink>
                    <a href="https://maxzz.github.io/test-pm-domain-logins" target="_blank" title="domain A/B tests">3</a>
                </IconSiteLink>
            </div>
        </div>
    );
}

//TODO: popup with image preview
