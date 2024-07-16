import { screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils";
import { useAtom } from "jotai";
import { Checkbox } from "./1-checkbox";
import { LevelSwitch } from "./2-level-switch";

export function FormOptions({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
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
                            data-dbg-tm />
                        <div className="">sec</div>
                    </div>}
            </div>

            <Checkbox label="Reload page vs. form" checked={pageReload} onChange={() => setPageReload((v) => !v)} />
            <div className="flex items-center">
                <Checkbox label="Use WebComponents" checked={useWebComp} onChange={() => setUseWebComp((v) => !v)} />
                <LevelSwitch className={useWebComp ? "" : "invisible"} />
            </div>
        </div>
    );
}
