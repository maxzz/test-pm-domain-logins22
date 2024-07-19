import { ChangeEvent, HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils";

type OneRadioProps = {
    value: number;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function OneRadio({ value, checked, onChange }: OneRadioProps) {
    return (
        <label className="flex items-center">
            <input
                type="radio"
                data-dbg-tm
                className="form-radio w-2.5 h-2.5 text-slate-400 focus:ring-1 focus:ring-offset-1 focus:ring-slate-500"
                value={value}
                onChange={onChange}
                checked={checked}
                name={`nest-level-${value}`}
            />
        </label>
    );
}

export function LevelSwitch({ className, ...rest }: HTMLAttributes<HTMLUListElement>) {

    const [nestLevel, setNestLevel] = useAtom(screenLoginOptionAtoms.nestLevelAtom);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        return setNestLevel(+event.target.value);
    }

    return (
        <ul className={classNames("ml-2 flex items-center space-x-0.5", className)} title="WebComponents render level" {...rest}>
            <OneRadio onChange={onChange} checked={nestLevel === 0} value={0} />
            <OneRadio onChange={onChange} checked={nestLevel === 1} value={1} />
            <OneRadio onChange={onChange} checked={nestLevel === 2} value={2} />
            <OneRadio onChange={onChange} checked={nestLevel === 3} value={3} />
        </ul>
    );
}
