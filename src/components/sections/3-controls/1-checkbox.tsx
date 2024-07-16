import { InputHTMLAttributes } from "react";

export function Checkbox({ label, checked, onChange }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                className="w-3 h-3 form-checkbox text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 rounded cursor-pointer"
                type="checkbox" {...{ checked, onChange }}
                data-dbg-tm />
            <div className="whitespace-nowrap">{label}</div>
        </label>
    );
}
