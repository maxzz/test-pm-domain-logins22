import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

type FieldSubmitProps = HTMLAttributes<HTMLButtonElement> & {
    label?: string;
};

const buttonClasses = "\
px-4 py-1.5 \
\
border \
border-slate-400 \
\
hover:bg-slate-300 \
\
focus:bg-slate-300 focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 focus:outline-none \
\
active:scale-[.97] \
rounded shadow-sm select-none";

/*
export function FieldSubmit({ label = '', className, ...rest }: FieldSubmitProps) {
    return (
        <button className={classNames(buttonClasses, className)} {...rest}>
            {label}
        </button>
    );
}

*/

export function FieldSubmit({ label = '', className, ...rest }: { label?: string; } & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={classNames(
                'px-4 py-1.5 hover:bg-slate-300 focus:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 active:scale-[.97] border-slate-400 border rounded shadow-sm select-none',
                className
            )}
            {...rest}
        >
            {label}
        </button>
    );
}
