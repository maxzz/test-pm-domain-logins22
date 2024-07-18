import { ReactNode } from "react";
import { a, useSpring } from "@react-spring/web";
import { classNames } from "@/utils";

const font = {
    fontFamily: 'Source Sans Pro, sans-serif',
    textShadow: '1px 1px #c4c4c4',
    // WebkitTextStroke: '1px #6e6e6e45',
    // WebkitTextFillColor: 'white',
    WebkitTextStroke: '1px #dadada3d',
    WebkitTextFillColor: '#003165', // hid-bg
    //transform: 'scaleY(1.2)',
};

export function LoginTitle({ label, logo, className, ...rest }: { label: React.ReactNode; logo: ReactNode; } & React.HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({ from: { scale: 0, borderWidth: '4px', opacity: 0 }, to: { scale: 1, borderWidth: '1px', opacity: 1, }, delay: 400, });
    return (
        <div className={classNames("px-4 py-4 flex items-center justify-between border-b border-slate-200 bg-slate-200 rounded-t-sm shadow select-none", className)} {...rest}>
            <div className="font-bold" style={font}>
                {label}
            </div>

            <a.div style={styles}
                className="px-4 w-16 h-16 text-5xl flex items-center justify-center text-slate-50 bg-slate-300/40 border-slate-50 border-4 rounded-md"
            >
                {logo}
            </a.div>
        </div>
    );
}
