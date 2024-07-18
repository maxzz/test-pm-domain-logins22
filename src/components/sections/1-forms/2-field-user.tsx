import { PrimitiveAtom, useAtom } from "jotai";

export function FieldUser({ fieldAtom, fieldId, placeholder = ' ' }: { fieldAtom: PrimitiveAtom<string>; fieldId: string; placeholder?: string; }) {
    const [value, setValue] = useAtom(fieldAtom);
    return (
        <label className="relative">
            <input
                className="py-1.5 w-full peer float-input border-slate-300 border"
                id={fieldId}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={((e) => setValue(e.target.value))} />
            <div className="float-label">
                {placeholder}
            </div>
        </label>
    );
}
