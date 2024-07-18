import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { screenLoginOptionAtoms } from "@/store/store";

type FieldPassProps = {
    fieldAtom: PrimitiveAtom<string>;
    fieldId: string;
    placeholder: string;
};
/*
export function FieldPass({ fieldAtom, fieldId, placeholder = ' ' }: FieldPassProps) {
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
                onChange={((e) => setValue(e.target.value))} />
            <div className="float-label">
                {placeholder}
            </div>
        </label>
    );
}
*/

export function FieldPass({ fieldAtom, fieldId, placeholder = ' ' }: { fieldAtom: PrimitiveAtom<string>; fieldId: string; placeholder: string; }) {
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
                onChange={((e) => setValue(e.target.value))} />
            <div className="float-label">
                {placeholder}
            </div>
        </label>
    );
}