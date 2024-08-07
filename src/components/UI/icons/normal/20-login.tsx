import { IconProps } from "./90-icon-props";
import { classNames } from "@/utils";

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
