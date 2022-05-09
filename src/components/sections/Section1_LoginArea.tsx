import { ReactNode } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { showSearchPageAtom } from '@/store/store';
import { a, easings, useSpring } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { IconSearch } from '../UI/UIIcons';

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

// function PreviewContainer() {
//     const styles = useSpring({ scale: 1, from: { scale: 2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
//     return (
//         <div className="bg-slate-400 overflow-hidden      text-center p-12" style={{ ...boxShadow, transition: "all .2s" }}>
//             <a.div style={styles} className="h-full object-cover">
//                 Place more here
//             </a.div>
//         </div>
//     );
// }

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

function LoginTitle({ label, logo, className, ...rest }: { label: React.ReactNode; logo: ReactNode; } & React.HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({ from: { scaleX: 0, opacity: 0, }, to: { scaleX: 1, opacity: 1, }, });
    return (
        <div className={classNames("px-4 py-4 flex items-center justify-between border-b border-slate-400 shadow select-none", className)} {...rest}>
            <div className="font-bold">{label}</div>
            <a.div
                style={styles}
                className="px-4 w-16 h-16 text-5xl flex items-center justify-center text-slate-50 bg-slate-300 border-slate-50 border-4 rounded-md"
            >
                {logo}
            </a.div>
        </div>
    );
}

function FieldUser({ fieldId = '', placeholder = ' ' }: { fieldId?: string; placeholder?: string; }) {
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input"
                id={`user${fieldId}`}
                type="text"
                placeholder={placeholder}
            />

            <div className="float-label">
                {placeholder}
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

function FieldSubmit({ label = '', className, ...rest }: { label?: string; } & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={classNames('px-4 py-2 hover:bg-red-500 active:scale-[.97] border-slate-600 border rounded', className)} {...rest}
            onClick={((e) => e.preventDefault())}
        >
            {label}
        </button>
    );
}

function ScreenLogin({ suffix = '' }: { suffix?: string; }) {
    return (
        <form id="tm-login-a-form" className="pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200" style={boxShadow}>
            <LoginTitle label={<div className="uppercase">Login A</div>} logo={<div className="pb-2">A</div>} />

            <div className="px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldUser fieldId={`user${suffix}`} placeholder="Username" />
                <FieldPass suffix={suffix} />
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Login" />
            </div>
        </form>
    );
}

function ScreenSearch({ suffix = '' }: { suffix?: string; }) {
    return (
        <form id="tm-search-form" className="pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200" style={boxShadow}>
            <LoginTitle
                label={<div className="uppercase">Search</div>}
                logo={<div className="text-orange-500"><IconSearch className="w-12 h-12 fill-transparent stroke-slate-100" strokeWidth={2} /></div>}
            />

            <div className="px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldUser fieldId={`seacrh${suffix}`} placeholder="Search" />
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Search" />
            </div>
        </form>
    );
}

function TempControls() {
    const [showSearch, setShowSearch] = useAtom(showSearchPageAtom);
    return (
        <div className="p-4">
            <label className="flex items-center justify-center space-x-2 select-none cursor-pointer">
                <input className="form-checkbox rounded cursor-pointer" type="checkbox" checked={showSearch} onChange={() => setShowSearch((v) => !v)} />
                <div className="">Search page</div>
            </label>
        </div>
    );
}

export function Section1_LoginArea() {
    const showSearch = useAtomValue(showSearchPageAtom);
    return (
        <div className="flex flex-col justify-between text-slate-800">

            <div className="mt-4 flex items-start justify-center">
                {/* <div className="mt-4 grid grid-cols-2 gap-4"> */}
                {/* <PreviewContainer /> */}

                {showSearch ? <ScreenSearch /> : <ScreenLogin suffix={'-2'} />}
            </div>

            <TempControls />
        </div>
    );
}
