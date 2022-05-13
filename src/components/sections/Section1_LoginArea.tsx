import React, { ReactNode, useCallback } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { doNextLoginOrCPassScreenAtom, loginApassAtom, loginAuserAtom, loginOrCpassScreenAtom, searchTextAtom, showSearchPageAtom } from '@/store/store';
import { a, AnimatedProps, config, easings, useSpring, useTransition } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { IconCPass, IconLogin, IconSearch } from '../UI/UIIcons';

const font = { 
    fontFamily: 'Merriweather, sans-serif',
    WebkitTextStroke: '1px #6e6e6e45',
    WebkitTextFillColor: 'white',
};

function LoginTitle({ label, logo, className, ...rest }: { label: React.ReactNode; logo: ReactNode; } & React.HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({ from: { scaleX: 0, opacity: 0, }, to: { scaleX: 1, opacity: 1, }, });
    return (
        <div className={classNames("px-4 py-4 flex items-center justify-between border-b border-slate-200 shadow select-none", className)} {...rest}>
            <div className="font-bold" style={font}>
                {label}
            </div>

            <a.div
                style={styles}
                className="px-4 w-16 h-16 text-5xl flex items-center justify-center text-slate-50 bg-slate-300/40 border-slate-50 border-4 rounded-md"
            >
                {logo}
            </a.div>
        </div>
    );
}

function FieldUser({ fieldAtom, fieldId, placeholder = ' ' }: { fieldAtom: PrimitiveAtom<string>; fieldId: string; placeholder?: string; }) {
    const [value, setValue] = useAtom(fieldAtom);
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input"
                id={fieldId}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={((e) => setValue(e.target.value))}
            />
            <div className="float-label">
                {placeholder}
            </div>
        </label>
    );
}

function FieldPass({ fieldAtom, fieldId, placeholder = ' ' }: { fieldAtom: PrimitiveAtom<string>; fieldId: string; placeholder: string; }) {
    const [value, setValue] = useAtom(fieldAtom);
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input"
                id={fieldId}
                type="password"
                placeholder={placeholder}
                autoComplete="current-password"
                value={value}
                onChange={((e) => setValue(e.target.value))}
            />
            <div className="float-label">
                {placeholder}
            </div>
        </label>
    );
}

function FieldSubmit({ label = '', className, ...rest }: { label?: string; } & React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={classNames('px-4 py-1.5 hover:bg-red-500 active:scale-[.97] border-slate-600 border rounded-sm', className)} {...rest}>
            {label}
        </button>
    );
}

const boxShadow = { boxShadow: '0 1px 1px 0px rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.1)', };

function ScreenLogin({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextLoginOrCPassScreenAtom);
    return (
        <form id="tm-login-a-form" className="min-h-[24rem] pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Login A</div>}
                logo={<div><IconLogin className="w-12 h-12 stroke-slate-400/50" /></div>}
            />

            <div className="flex-1 px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldUser fieldAtom={loginAuserAtom} fieldId={`user${suffix}`} placeholder="Username" />
                <FieldPass fieldAtom={loginApassAtom} fieldId={`pass${suffix}`} placeholder="Password" />
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Login"
                    onClick={(e) => {
                        e.preventDefault();
                        doNextLoginOrCPassScreen();
                    }}
                />
            </div>
        </form>
    );
}

function ScreenCPass({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextLoginOrCPassScreenAtom);
    return (
        <form id="tm-cpass-a-form" className="pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Password<br />Change</div>}
                logo={<div><IconCPass className="w-12 h-12 stroke-slate-400/50" /></div>}
            />

            <div className="px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldPass fieldAtom={loginApassAtom} fieldId={`old-pass${suffix}`} placeholder="Old Password" />
                <FieldPass fieldAtom={loginApassAtom} fieldId={`new-pass${suffix}`} placeholder="New Password" />
                <FieldPass fieldAtom={loginApassAtom} fieldId={`cnf-pass${suffix}`} placeholder="Confirm New Password" />
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Change"
                    onClick={(e) => {
                        e.preventDefault();
                        doNextLoginOrCPassScreen();
                    }}
                />
            </div>
        </form>
    );
}

function ScreenSearch({ suffix = '' }: { suffix?: string; }) {
    const showSearch = useUpdateAtom(showSearchPageAtom);
    return (<>
        {/* Don't use 'search' word in form name or field names/IDs */}
        <form id="tm-sear-form" className="pb-4 flex flex-col space-y-4 rounded-sm bg-slate-200 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Search</div>}
                logo={<div className="text-orange-500"><IconSearch className="w-12 h-12 fill-transparent stroke-slate-100" strokeWidth={2} /></div>}
            />

            <div className="px-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <div className="flex items-center space-x-2">
                    <FieldUser fieldAtom={searchTextAtom} fieldId={`sear${suffix}`} placeholder="Search" />
                    <div className="">
                        <select className="h-[37px] px-1 py-1.5" name="state">
                            <option value="">CA</option>
                            <option value="">WA</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="px-4 self-end">
                <FieldSubmit className="" label="Search"
                    onClick={(e) => {
                        e.preventDefault();
                        showSearch(false);
                    }}
                />
            </div>
        </form>
    </>);
}

function TempControls() {
    const [showSearch, setShowSearch] = useAtom(showSearchPageAtom);
    //const onClick = useCallback(() => setCurrent((state) => (state + 1) % screens.length), []);
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextLoginOrCPassScreenAtom);
    return (
        <div className="p-4 flex items-center justify-center space-x-4 select-none">
            <label className="flex items-center justify-center space-x-2 cursor-pointer">
                <input
                    className="form-checkbox text-slate-500 focus:ring-slate-500 rounded cursor-pointer"
                    type="checkbox" checked={showSearch} onChange={() => setShowSearch((v) => !v)}
                />
                <div className="">Search page</div>
            </label>

            {/* <input type="button" className="" value="Next" onClick={onClick} /> */}
            <input
                className={classNames(
                    `px-4 py-1 border-slate-400 hover:bg-slate-400 focus:bg-slate-300 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 outline-none border rounded active:scale-[.97] cursor-pointer`,
                    showSearch && 'invisible'
                )}
                type="button" value="Next" onClick={doNextLoginOrCPassScreen} title="Next screen"
            />
        </div>
    );
}

function Mount({ showAtom: showAtom, children }: { showAtom: PrimitiveAtom<boolean>; } & React.HTMLAttributes<HTMLDivElement>) {
    const show = useAtomValue(showAtom);
    const transitions = useTransition(show, {
        from: { y: -400, opacity: 0, },
        enter: { y: 0, opacity: 1, config: { duration: 500, easing: easings.easeOutCubic }, },
        leave: { y: -200, opacity: 0, config: { duration: 400, easing: easings.easeOutQuad }, /* onRest: () => console.log('done') */ },
        //config: { duration: 200, },
    });
    return transitions((styles, item) => item && (
        <a.div style={styles}>
            {children}
        </a.div>)
    );
}

const screens: ((props: AnimatedProps<{ style: React.CSSProperties; }>) => React.ReactElement)[] = [
    ({ style }: { style: any; }) => <a.div style={style}><ScreenLogin suffix={'-1'} /></a.div>,
    ({ style }: { style: any; }) => <a.div style={style}><ScreenCPass suffix={'-2'} /></a.div>,
];

export function Section1_LoginArea() {
    const showSearch = useAtomValue(showSearchPageAtom);
    const [current, setCurrent] = useAtom(loginOrCpassScreenAtom);

    const transitions = useTransition(current, {
        from: { opacity: 0, x: '150%', scale: 1, },
        enter: { opacity: 1, x: '0%', config: { easing: easings.easeInCubic, duration: 300, } },
        leave: { opacity: 0, x: '-150%', scale: 0, config: { easing: easings.easeInCubic, duration: 0, }, }, // or duration: 300
        config: { ...config.molasses },
        exitBeforeEnter: true,
    });

    return (
        <div className="flex flex-col justify-between text-slate-800 overflow-hidden">

            <div className="mt-4 flex items-start justify-center">
                {showSearch
                    ?
                    <Mount showAtom={showSearchPageAtom}>
                        <ScreenSearch />
                    </Mount>
                    : <>
                        {transitions((styles) => {
                            const Screen = screens[current];
                            return <Screen style={styles} />;
                        })}
                    </>
                }
            </div>

            <TempControls />
        </div>
    );
}
