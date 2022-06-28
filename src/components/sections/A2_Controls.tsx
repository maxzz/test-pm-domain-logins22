import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doNextScreenAtom, isLoginScreenAtom, navOptionAtoms, screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { ChangeEvent, InputHTMLAttributes } from "react";

function Checkbox({ label, checked, onChange }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                type="checkbox" {...{ checked, onChange }}
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
            <label className="flex items-center"><input className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 0} value={0} name="nestLevel" /></label>
            <label className="flex items-center"><input className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 1} value={1} name="nestLevel" /></label>
            <label className="flex items-center"><input className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 2} value={2} name="nestLevel" /></label>
            <label className="flex items-center"><input className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500" type="radio" onChange={onChange} checked={nestLevel === 3} value={3} name="nestLevel" /></label>
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

export function A2_Controls() {
    const [showSearch, setShowSearch] = useAtom(navOptionAtoms.showSearchAtom);
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);
    const isLoginScreen = useAtomValue(isLoginScreenAtom);
    return (
        <div className="mb-1 p-4 w-[290px] self-center bg-slate-100 border-slate-200 border rounded-sm flex justify-center select-none">
            <div className="flex flex-col space-y-4">
                <FormOptions className={`${!isLoginScreen && 'invisible'}`} />

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

//TODO: hot keys for Use webComponents switch
