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

export function useCountdownTimer2({ startVal, counterAtom, runAtom }: { startVal: number; counterAtom: PrimitiveAtom<number>; runAtom: PrimitiveAtom<boolean>; }) {
    const setCounter = useUpdateAtom(counterAtom);
    const [run, setRun] = useAtom(runAtom);
    const [runing, setRuning] = React.useState(false);
    const countdownId = React.useRef<ReturnType<typeof setInterval>>();

    console.log('useCountdownTimer2 run', run);
    
    const stopTimer = React.useCallback(() => (clearInterval(countdownId.current), (countdownId.current = undefined)), []);

    React.useEffect(() => {
        if (run && startVal > 0) {
            console.log('useCountdownTimer2 effect true, startVal', startVal);
            stopTimer();
            setCounter(startVal);
            setRuning(true);
        } else {
            console.log('useCountdownTimer2 effect false, startVal', startVal);
            setRuning(false);
        }
    }, [run, setCounter]);

    React.useEffect(() => {
        if (runing) {
            countdownId.current = setInterval(() => {
                setCounter((v) => {
                    v--;
                    v < 0 && setRun(false);
                    console.log('----------------------useCountdownTimer2 callback counter =', v);
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
