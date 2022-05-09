import { useRef } from 'react';
import { a, easings, useSpring } from '@react-spring/web';
import { classNames } from '@/utils/classnames';

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function PreviewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: 2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-400 overflow-hidden      text-center p-12" style={{ ...boxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="h-full object-cover">
                Place more here
            </a.div>
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

function FieldUser({ suffix = '' }: { suffix?: string; }) {
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input"
                id={`user${suffix}`}
                type="text"
                placeholder="Username"
            />

            <div className="float-label">
                Username
            </div>
        </label>
    );
}

function FieldPass({ suffix = '' }: { suffix?: string; }) {
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input"
                id={`pass${suffix}`}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
            />

            <div className="float-label">
                Password
            </div>
        </label>
    );
}

function LoginTitle({ label = '', className, ...rest }: { label?: string; } & React.HTMLAttributes<HTMLInputElement>) {
    const styles = useSpring({
        from: {
            scaleX: 0,
            opacity: 0,
        }, to: {
            scaleX: 1,
            opacity: 1,
        },
    });
    return (
        <div className={classNames("px-4 py-4 flex items-center justify-between border-b border-slate-400 shadow", className)}>
            <div className="font-bold">Login A</div>
            <a.div style={styles} className="px-4 w-16 h-16 text-5xl flex items-center justify-center text-slate-50 bg-slate-300 border-slate-50 border-4 rounded-md">A</a.div>
        </div>
    );
}

function FieldSubmit({ label = '', className, ...rest }: { label?: string; } & React.HTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames('px-4 py-2 border border-slate-600 rounded', className)} type="button" value={label} {...rest} />
    );
}

function LoginView({ suffix = '' }: { suffix?: string; }) {
    return (
        <form className="pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200" style={boxShadow}>
            <LoginTitle />

            <div className="px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldUser suffix={suffix} />
                <FieldPass suffix={suffix} />
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Login" />
            </div>
        </form>
    );
}

export function Section1_LoginArea() {
    return (
        // <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="mt-4 flex items-start justify-center">
            {/* <PreviewContainer /> */}
            <LoginView suffix={'-2'} />
        </div>
    );
}
