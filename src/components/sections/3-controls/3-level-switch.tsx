import { screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils";
import { useAtom } from "jotai";
import { ChangeEvent } from "react";

export function LevelSwitch({ className }: React.HTMLAttributes<HTMLUListElement>) {
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
