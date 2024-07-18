import { classNames } from "@/utils";

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
