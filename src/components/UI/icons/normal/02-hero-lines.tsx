import { IconProps } from "./90-icon-props";

export function IconHeroLines({ title, ...rest }: IconProps) {
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
