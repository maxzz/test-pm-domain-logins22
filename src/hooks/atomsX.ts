import { atom, Getter, PrimitiveAtom, SetStateAction, Setter, WritableAtom } from 'jotai';

export type OnValueChange<Value> = ({ get, set, nextValue }: { get: Getter; set: Setter; nextValue: Value; }) => void;

export function atomWithCallback<Value>(initialValue: Value, onValueChange: OnValueChange<Value>): WritableAtom<Value, SetStateAction<Value>> {
    const baseAtom = atom(initialValue);
    const derivedAtom = atom<Value, SetStateAction<Value>>(
        (get) => get(baseAtom),
        (get, set, update: SetStateAction<Value>) => {
            const nextValue = typeof update === 'function'
                ? (update as (prev: Value) => Value)(get(baseAtom))
                : update;
            set(baseAtom, nextValue);
            onValueChange({ get, set, nextValue });
        }
    );
    return derivedAtom;
}

export type Atomize<T> = {
    [key in keyof T & string as `${key}Atom`]: PrimitiveAtom<T[key]>;
};

export type LoadingDataState<T> = { loading: boolean, error: unknown | null, data: T | null; };
export const loadingDataStateInit = () => ({ loading: true, error: null, data: null });
