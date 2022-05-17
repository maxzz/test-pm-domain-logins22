import { Atom, PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import React from "react";

export function useCountdownTimer({ startVal, setValue }: { startVal: number; setValue: React.Dispatch<React.SetStateAction<number>>; }) {

    console.log('useCountdownTimer render', startVal);

    const [run, setRun] = React.useState(false);
    const countdownId = React.useRef<ReturnType<typeof setInterval>>();

    const stopTimer = React.useCallback(() => {
        clearInterval(countdownId.current), (countdownId.current = undefined);
    }, []);

    const start = React.useCallback(() => {
        if (startVal > 0) {
            stopTimer();
            setValue(startVal);
            setRun(true);
        }
    }, []);

    const stop = React.useCallback(() => {
        setRun(false);
    }, []);

    React.useEffect(() => {
        if (run && startVal > 0) {
            countdownId.current = setInterval(() => {
                setValue((v) => {
                    v--;
                    v < 0 && stopTimer();
                    console.log('useCountdownTimer callback', v);
                    return v;
                });
            }, 1000);
        } else {
            stopTimer();
            setValue(-1);
        }
    }, [run, startVal, setValue]);

    React.useEffect(() => stopTimer, []);

    return { start, stop, };
}

export function useCountdownTimer2({ startVal, counterAtom, runAtom }: { startVal: number; counterAtom: PrimitiveAtom<number>; runAtom: Atom<boolean>; }) {
    const setCounter = useUpdateAtom(counterAtom);
    const run = useAtomValue(runAtom);
    const [runing, setRuning] = React.useState(false);
    const countdownId = React.useRef<ReturnType<typeof setInterval>>();

    const stopTimer = React.useCallback(() => (clearInterval(countdownId.current), (countdownId.current = undefined)), []);

    React.useEffect(() => {
        if (run && startVal > 0) {
            stopTimer();
            setCounter(startVal);
            setRuning(true);
        } else {
            setRuning(false);
        }
    }, [run, setCounter]);

    React.useEffect(() => {
        if (runing) {
            countdownId.current = setInterval(() => {
                setCounter((v) => {
                    v--;
                    v < 0 && setRuning(false);
                    console.log('useCountdownTimer2 callback', v);
                    return v;
                });
            }, 1000);
        } else {
            stopTimer();
            setCounter(-1);
        }
    }, [runing, setCounter]);

    React.useEffect(() => stopTimer, []);
}
