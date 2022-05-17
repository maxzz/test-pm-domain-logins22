import React, { ReactNode } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { countdownAtom, credAtoms, doNextScreenAtom, isLoginScreenAtom, navOptionAtoms, runCountdownAtom, screenLoginOptionAtoms } from '@/store/store';
import { a, AnimatedProps, config, easings, useSpring, useTransition } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { IconCPass, IconLogin, IconSearch } from '../UI/UIIcons';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';

const font = {
    fontFamily: 'Source Sans Pro, sans-serif',
    textShadow: '1px 1px #c4c4c4',
    // WebkitTextStroke: '1px #6e6e6e45',
    // WebkitTextFillColor: 'white',
    WebkitTextStroke: '1px #dadada3d',
    WebkitTextFillColor: '#003165',
    //transform: 'scaleY(1.2)',
};

function LoginTitle({ label, logo, className, ...rest }: { label: React.ReactNode; logo: ReactNode; } & React.HTMLAttributes<HTMLDivElement>) {
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

function FieldUser({ fieldAtom, fieldId, placeholder = ' ' }: { fieldAtom: PrimitiveAtom<string>; fieldId: string; placeholder?: string; }) {
    const [value, setValue] = useAtom(fieldAtom);
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input border-slate-300 border"
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
    const reveal = useAtomValue(screenLoginOptionAtoms.revealAtom);
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input border-slate-300 border"
                id={fieldId}
                type={reveal ? "text" : "password"}
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
        <button
            className={classNames(
                'px-4 py-1.5 hover:bg-slate-300 focus:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 active:scale-[.97] border-slate-600 border rounded select-none',
                className
            )}
            {...rest}
        >
            {label}
        </button>
    );
}

// const boxShadow = { boxShadow: '0 1px 1px 0px rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.1)', };
const boxShadow = { boxShadow: '0 1px 1px 0px rgba(0,0,0,.1), 0 1px 3px 0 rgba(0,0,0,.1)', };

function ScreenLogin({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextScreenAtom);
    return (
        <form id="tm-login-a-form" className="min-h-[24rem] flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">User login</div>}
                logo={<div className="inset-0"><IconLogin className="w-12 h-12 stroke-slate-400/50" /></div>}
            />

            <div className="flex-1 mt-2 px-4 pt-8 pb-2 w-72 flex flex-col space-y-8">
                <FieldUser fieldAtom={credAtoms.usernameAtom} fieldId={`user${suffix}`} placeholder="Username" />
                <FieldPass fieldAtom={credAtoms.passwordAtom} fieldId={`pass${suffix}`} placeholder="Password" />
            </div>

            <div className="self-end">
                <FieldSubmit className="m-4" label="Log in" onClick={(e) => { e.preventDefault(); doNextLoginOrCPassScreen(); }} />
            </div>
        </form>
    );
}

function ScreenCPass({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextScreenAtom);
    return (
        <form id="tm-cpass-a-form" className="flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Password Change</div>}
                logo={<div className="inset-0"><IconCPass className="w-12 h-12 stroke-slate-400/50" /></div>}
            />

            <div className="px-4 mt-6 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <FieldPass fieldAtom={credAtoms.passwordAtom} fieldId={`old-pass${suffix}`} placeholder="Old Password" />
                <FieldPass fieldAtom={credAtoms.updtpassAtom} fieldId={`new-pass${suffix}`} placeholder="New Password" />
                <FieldPass fieldAtom={credAtoms.confpassAtom} fieldId={`cnf-pass${suffix}`} placeholder="Confirm New Password" />
            </div>

            <div className="self-end">
                <FieldSubmit className="m-4" label="Change" onClick={(e) => { e.preventDefault(); doNextLoginOrCPassScreen(); }} />
            </div>
        </form>
    );
}

function ScreenSearch({ suffix = '' }: { suffix?: string; }) {
    const showSearch = useUpdateAtom(navOptionAtoms.showSearchAtom);
    return (<>
        {/* Don't use 'search' word in form name or field names/IDs */}
        <form id="tm-sear-form" className="flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Search</div>}
                logo={<div className="text-orange-500"><IconSearch className="w-12 h-12 fill-transparent stroke-slate-100" strokeWidth={2} /></div>}
            />

            <div className="px-4 mt-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <div className="flex items-center space-x-2">
                    <FieldUser fieldAtom={credAtoms.searchAAAtom} fieldId={`sear${suffix}`} placeholder="Search" />
                    <div className="">
                        <select className="h-[37px] px-1 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 border-slate-300 border" name="state">
                            <option value="">CA</option>
                            <option value="">WA</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="self-end">
                <FieldSubmit className="m-4" label="Search" onClick={(e) => { e.preventDefault(); showSearch(false); }} />
            </div>
        </form>
    </>);
}

function ScreenControls({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const { revealAtom, doIntervalAtom, intervalAtom, pageReloadAtom, } = screenLoginOptionAtoms;
    const [reveal, setReveal] = useAtom(revealAtom);
    const [doInterval, setDoInterval] = useAtom(doIntervalAtom);
    const [interval, setInterval] = useAtom(intervalAtom);
    const [pageReload, setPageReload] = useAtom(pageReloadAtom);
    return (
        <div className={classNames("px-2 py-1 text-xs bg-slate-100 border-slate-400 border rounded-sm shadow select-none", className)} {...rest}>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                    type="checkbox" checked={reveal} onChange={() => setReveal((v) => !v)}
                />
                <div className="whitespace-nowrap">Reveal passwords</div>
            </label>
            <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                        type="checkbox" checked={doInterval} onChange={() => setDoInterval((v) => !v)}
                    />
                    <div className="whitespace-nowrap">Reload interval</div>
                </label>

                {doInterval
                    ?
                        <div className="h-[18px] pl-1 pt-0.5">{interval} sec</div>
                    :
                    <div className={classNames('pl-1 flex items-center space-x-1', doInterval && 'invisible')}>
                        <input
                            className="w-10 px-1 border-slate-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 border rounded" type="text"
                            value={interval} onChange={((e) => setInterval(+e.target.value))}
                        />
                        <div className="">sec</div>
                    </div>
                }
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                    type="checkbox" checked={pageReload} onChange={() => setPageReload((v) => !v)}
                />
                <div className="whitespace-nowrap">Reload page vs. form</div>
            </label>
        </div>
    );
}

function Controls() {
    const [showSearch, setShowSearch] = useAtom(navOptionAtoms.showSearchAtom);
    const doNextLoginOrCPassScreen = useUpdateAtom(doNextScreenAtom);
    const isLoginScreen = useAtomValue(isLoginScreenAtom);

    const doInterval = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const intervalVal = useAtomValue(screenLoginOptionAtoms.intervalAtom);

    useCountdownTimer({ startVal: intervalVal, counterAtom: countdownAtom, runAtom: runCountdownAtom });

    const runCountdown = useUpdateAtom(runCountdownAtom);
    React.useEffect(() => runCountdown(doInterval), [doInterval, intervalVal]);

    return (
        <div className="mb-1 p-4 w-[290px] self-center bg-slate-100 border-slate-200 border rounded-sm flex justify-center select-none">
            <div className="flex flex-col space-y-4">
                <ScreenControls className={`${!isLoginScreen && 'invisible'}`} />

                <div className="flex space-x-4">
                    {/* Show search page */}
                    <label className="flex items-center justify-center space-x-2 cursor-pointer">
                        <input
                            className="w-5 h-5 form-checkbox text-slate-400 focus:ring-slate-500 rounded cursor-pointer"
                            type="checkbox" checked={showSearch} onChange={() => setShowSearch((v) => !v)}
                        />
                        <div className="">Search page</div>
                    </label>
                    {/* Next */}
                    <input
                        className={classNames(
                            `px-4 py-1 border-slate-400 hover:bg-slate-300 focus:bg-slate-300 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 outline-none border rounded active:scale-[.97] cursor-pointer`,
                            showSearch && 'invisible'
                        )}
                        type="button" value="Next" onClick={doNextLoginOrCPassScreen} title="Next screen"
                    />
                </div>

            </div>
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

function BlankScreen() {
    const blankScreen = useUpdateAtom(navOptionAtoms.blankScreenAtom);

    const styles = useSpring({
        from: { scaleY: 1, scaleX: 1, opacity: 1, background: '#94a3b8', },
        to: [
            { scaleY: .1, scaleX: .9, config: { duration: 700, } },
            { scaleY: 1, scaleX: 0, config: { duration: 1, } },
            { scaleY: 1, scaleX: .9, opacity: 0, config: { easing: easings.easeOutCubic, duration: 1000, } },
        ],
        //config: { duration: 400, },
        onRest: () => blankScreen(false),
    });//bg-orange-400/20
    return (
        <div className="relative w-full h-[24rem] flex items-center justify-center">
            <div className="text-2xl text-white">Reloading...</div>
            <a.div style={styles} className="absolute inset-0"></a.div>
        </div>
    );
}

export function Section1_LoginArea() {
    const showSearch = useAtomValue(navOptionAtoms.showSearchAtom);
    //const blankScreen = true;
    const blankScreen = useAtomValue(navOptionAtoms.blankScreenAtom);
    const currentIdx = useAtomValue(navOptionAtoms.screenIdxAtom);

    const transitions = useTransition(currentIdx, {
        from: { opacity: 0, x: '150%', scale: 1, },
        enter: { opacity: 1, x: '0%', config: { easing: easings.easeInCubic, duration: 300, } },
        leave: { opacity: 0, x: '-150%', scale: 0, config: { easing: easings.easeInCubic, duration: 0, }, }, // or duration: 300
        config: { ...config.molasses },
        exitBeforeEnter: true,
        // onRest: (result, ctrl, item) => {
        //     console.log('%c--------------------------onRest %ccurrentIdx = %i%c %o %o', 'color: slateblue', colorIdx(), currentIdx, 'color: slateblue', { item }, { result }, { ctrl });
        // }
    });

    // const colorIdx = () => currentIdx === 0 ? 'color: orange' : 'color: khaki';
    // console.log('%c----------------------- render() %ccurrentIdx = %i', 'color: gray', colorIdx(), currentIdx);

    return (
        <div className="flex flex-col justify-between text-slate-800">

            <div className="overflow-hidden">
                <div className="my-8 flex items-start justify-center">
                    {blankScreen
                        ? <BlankScreen />
                        : showSearch
                            ?
                            <Mount showAtom={navOptionAtoms.showSearchAtom}>
                                <ScreenSearch />
                            </Mount>
                            : <>
                                {transitions((styles, item, transition) => {
                                    // console.log('%c...................transitions() currentIdx = %i %o phase %c%s%c transition', colorIdx(), currentIdx, { item }, 'color: green', transition.phase, 'color: gray', transition);

                                    const Screen = screens[currentIdx];
                                    return Screen ? <Screen style={styles} /> : null;
                                })}
                            </>
                    }
                </div>
            </div>

            <Controls />
        </div>
    );
}
