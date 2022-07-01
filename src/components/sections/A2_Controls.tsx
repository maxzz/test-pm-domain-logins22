import { Atom, PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { doNextScreenAtom, isLoginScreenAtom, navOptionAtoms, screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { a, easings, useTransition } from "@react-spring/web";

function Checkbox({ label, checked, onChange }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                type="checkbox" {...{ checked, onChange }}
                data-dbg-tm
            />
            <div className="whitespace-nowrap">{label}</div>
        </label>
    );
}

function LevelSwitch({ className }: React.HTMLAttributes<HTMLUListElement>) {
    const [nestLevel, setNestLevel] = useAtom(screenLoginOptionAtoms.nestLevelAtom);
    const onChange = (event: ChangeEvent<HTMLInputElement>) => setNestLevel(+event.target.value);
    return (
        <ul className={classNames("ml-2 flex items-center space-x-0.5", className)} title="WebComponents render level">
            <label className="flex items-center"><input data-dbg-tm className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 0} value={0} name="nestLevel" /></label>
            <label className="flex items-center"><input data-dbg-tm className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 1} value={1} name="nestLevel" /></label>
            <label className="flex items-center"><input data-dbg-tm className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 2} value={2} name="nestLevel" /></label>
            <label className="flex items-center"><input data-dbg-tm className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 3} value={3} name="nestLevel" /></label>
        </ul>
    );
}

function FormOptions({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
    const { revealAtom, doIntervalAtom, intervalAtom, pageReloadAtom, useWebCompAtom, } = screenLoginOptionAtoms;
    const [reveal, setReveal] = useAtom(revealAtom);
    const [doInterval, setDoInterval] = useAtom(doIntervalAtom);
    const [interval, setInterval] = useAtom(intervalAtom);
    const [pageReload, setPageReload] = useAtom(pageReloadAtom);
    const [useWebComp, setUseWebComp] = useAtom(useWebCompAtom);
    return (
        <div className={classNames("px-2 py-1 text-xs bg-slate-100 border-slate-400 border rounded-sm shadow select-none", className)} {...rest}>
            <Checkbox label="Reveal passwords" checked={reveal} onChange={() => setReveal((v) => !v)} />

            <div className="flex items-center">
                <Checkbox label="Reload interval" checked={doInterval} onChange={() => setDoInterval((v) => !v)} />
                {doInterval
                    ?
                    <div className="h-[18px] pl-1 pt-0.5"><span className="font-bold">{interval}</span> sec</div>
                    :
                    <div className="pl-1 flex items-center space-x-1">
                        <input
                            className="w-10 px-1 border-slate-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 border rounded" type="text"
                            value={interval} onChange={((e) => setInterval(+e.target.value))}
                            data-dbg-tm
                        />
                        <div className="">sec</div>
                    </div>
                }
            </div>

            <Checkbox label="Reload page vs. form" checked={pageReload} onChange={() => setPageReload((v) => !v)} />
            <div className="flex items-center">
                <Checkbox label="Use WebComponents" checked={useWebComp} onChange={() => setUseWebComp((v) => !v)} />
                <LevelSwitch className={useWebComp ? "" : "invisible"} />
            </div>
        </div>
    );
}

/* Too many motion * /
function MountOptions({ showAtom, children }: { showAtom: Atom<boolean>; } & React.HTMLAttributes<HTMLDivElement>) {
    const show = useAtomValue(showAtom);
    const transitions = useTransition(show ? 1 : 0, {
        from: { x: -200, opacity: 0, },
        enter: { x: 0, opacity: 1, config: { duration: 200, easing: easings.easeOutCubic }, },
        leave: { x: -100, opacity: 0, config: { duration: 200, easing: easings.easeOutQuad }, },
    });
    return transitions((styles, item) => !!item && (
        <a.div style={styles}>
            {children}
        </a.div>)
    );
}
/**/

function Mount({ showAtom, children }: { showAtom: Atom<boolean>; } & React.HTMLAttributes<HTMLDivElement>) {
    const show = useAtomValue(showAtom);
    const doIntevel = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const transitions = useTransition(show && !doIntevel, {
        from: { x: -200, opacity: 0, },
        enter: { x: 0, opacity: 1, config: { duration: 150, easing: easings.easeOutCubic }, },
        leave: { x: -100, opacity: 0, config: { duration: 150, easing: easings.easeOutQuad }, /* onRest: () => console.log('done') */ },
    });
    return transitions((styles, item) => !!item && (
        <a.div style={styles}>
            {children}
        </a.div>)
    );
}

export function A2_Controls() {
    const [showSearch, setShowSearch] = useAtom(navOptionAtoms.showSearchAtom);
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);
    const isLoginScreen = useAtomValue(isLoginScreenAtom);
    return (
        <div className="mb-4 p-4 w-[290px] self-center bg-slate-100 border-slate-200 border rounded-sm flex justify-center select-none">
            <div className="flex flex-col space-y-4">
                {/* <MountOptions showAtom={isLoginScreenAtom}>
                    <FormOptions className={`${!isLoginScreen && 'invisible'}`} />
                </MountOptions> */}
                <FormOptions className={`${!isLoginScreen && 'invisible'}`} />

                <div className="h-9 flex items-end justify-between">

                    {/* Show search page */}
                    <label className="flex items-center justify-center space-x-2 cursor-pointer">
                        <input
                            className="w-5 h-5 form-checkbox text-slate-400 focus:ring-slate-500 focus:ring-1 rounded cursor-pointer"
                            type="checkbox" checked={showSearch} onChange={() => setShowSearch((v) => !v)}
                            data-dbg-tm
                        />
                        <div className="">Search page</div>
                    </label>

                    {/* Next */}
                    <Mount showAtom={isLoginScreenAtom}>
                        <input
                            className={classNames(
                                `px-4 py-1 border-slate-400 hover:bg-slate-300 focus:bg-slate-300 focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 outline-none border rounded active:scale-[.97] cursor-pointer`,
                                //showSearch && 'invisible'
                            )}
                            type="button" value="Next" onClick={doNextLoginOrCPassScreen} title="Next screen"
                            data-dbg-tm
                        />
                    </Mount>

                </div>
            </div>
        </div>
    );
}

//TODO: hot keys for Use webComponents switch
