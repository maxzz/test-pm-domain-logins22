import { forwardRef } from "react";
import { IconProps, svgRoundedCaps } from "./90-icon-props";
import { classNames } from "@/utils/classnames";

export function IconHeroLines(props: IconProps) {
    const { title, ...rest } = props;
    return (
        <svg viewBox="0 0 520 171" {...rest}>
            {title && <title>{title}</title>}
            <path d="M1 44c45-11 68 29 81 51l4 7c10 15 23 28 38 38 24 17 49 22 73 17 45-10 119-64 167-99l32-22C441 4 518 1 519 1" />
            <path d="M1 62c23-2 40 17 59 40 20 23 42 49 76 57 68 16 85 13 194-68s188-76 189-76" />
            <path d="M0 80c52-31 118-21 152 7 38 31 91 62 116 60 18-2 41-13 66-24 25-12 51-24 78-30 53-11 107 5 107 6" />
            <path d="M1 129s15 3 51-17c24-13 45-19 67-19 29 1 59 13 92 36 69 50 119 54 184 15 59-36 124-1 124 0" />
            <path d="M1 125c7 1 18-4 33-10 21-10 51-23 83-22 26 2 47 17 70 33 26 19 53 38 88 39 35 0 60-10 85-19 22-9 43-17 69-17 54 0 90 36 91 36" />
        </svg>
    );
}

export function IconHero(props: IconProps) {
    const { title, ...rest } = props;
    return (
        <svg viewBox="0 0 100 100" {...rest}>
            {title && <title>{title}</title>}
            <path d="M50 45.23 51.38 4.8 90.2 45.23 52.23 60.68l22.6-15.45L50 95.19 25.17 45.23l22.6 15.45L9.8 45.23 48.62 4.8 50 45.23Z" />
        </svg>
    );
}

export function IconSearch({ title, ...rest }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M15.5 15.5L19 19M5 11a6 6 0 1 0 12 0a6 6 0 0 0-12 0Z" />
        </svg>
    );
}

export function IconCPass({ title, className, ...rest }: IconProps) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M4.993 12.984a1 1 0 0 0-.531 1.848L7.15 17.52a1 1 0 1 0 1.414-1.415l-1.121-1.12h7.55a1 1 0 0 0 0-2h-10Zm14.014-1.968a1 1 0 0 0 .531-1.848L16.85 6.48a1 1 0 0 0-1.414 1.415l1.121 1.12h-7.55a1 1 0 0 0 0 2h10Z" />
        </svg>
    );
}

export function IconLogin({ title, className, ...rest }: IconProps) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 32 32" {...rest}>
            {title && <title>{title}</title>}
            <path d="M7 30a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5zm0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3z" />
            <path d="M23 30a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5zm0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3z" />
            <path d="M24 7v7l3.586-3.414L29 12l-6 6l-6-6l1.414-1.414L22 14V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v11H6V7a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3z" />
        </svg>
    );
}

// export function IconSiteLink({ title, ...rest }: IconProps) {
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

export function IconGithubLogo(props: IconProps) {
    const { title, ...rest } = props;
    return (
        <svg viewBox="0 0 1024 1024" {...rest}>
            {title && <title>{title}</title>}
            <path d="M512 76a447 447 0 00-148 870c23 6 20-11 20-22v-78c-136 16-141-74-151-89-18-31-61-39-48-54 30-16 62 4 98 58 27 39 78 32 104 26 6-24 18-45 35-61-141-25-199-111-199-213 0-49 16-95 48-132-20-60 2-112 5-120 58-5 119 42 123 46a435 435 0 01226 0c12-9 68-49 122-44 3 8 25 58 5 118 33 37 49 83 49 132 0 103-59 189-200 213a128 128 0 0138 91v113c1 9 0 18 15 18A448 448 0 00512 76z" />
        </svg>
    );
}

// export const IconHeroWRef = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
//     const { title, ...rest } = props;
//     return (
//         <svg ref={ref} viewBox="0 0 14 14" {...rest}>
//             {title && <title>{title}</title>}
//             <path d="M7.5,6.4L7.68,1.14L12.73,6.4L7.79,8.41L10.73,6.4L7.5,12.9L4.27,6.4L7.21,8.41L2.27,6.4L7.32,1.14z" />
//         </svg>
//     );
// })

// export function IconImagePlus(props: IconProps) {
//     const { title, className, ...rest } = props;
//     return (
//         <svg className={classNames("fill-current", className)} viewBox="0 0 24 24" {...rest}>
//             {title && <title>{title}</title>}
//             <path d="M19 10a1 1 0 0 0-1 1v3.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.71l-2.48-2.49a2.79 2.79 0 0 0-3.93 0L4 12.61V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12.22A2.79 2.79 0 0 0 4.78 22h12.44a2.88 2.88 0 0 0 .8-.12a2.74 2.74 0 0 0 2-2.65V11A1 1 0 0 0 19 10zM5 20a1 1 0 0 1-1-1v-3.57l2.89-2.89a.78.78 0 0 1 1.1 0L15.46 20zm13-1a1 1 0 0 1-.18.54L13.3 15l.71-.7a.77.77 0 0 1 1.1 0L18 17.21zm3-15h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2z" />
//         </svg>
//     );
// }

export function IconDownload(props: IconProps) {
    const { title, className, ...rest } = props;
    return (
        <svg className={classNames("fill-none text-current stroke-2", className)} {...svgRoundedCaps} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

export function IconClipboard(props: IconProps) {
    const { title, className, ...rest } = props;
    return (
        <svg className={classNames("fill-none text-current stroke-2", className)} {...svgRoundedCaps} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
    );
}
