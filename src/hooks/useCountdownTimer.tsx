import React, { useCallback, useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";

export function useCountdownTimer({ startVal, counterAtom, runAtom }: { startVal: number; counterAtom: PrimitiveAtom<number>; runAtom: PrimitiveAtom<boolean>; }) {
    const setCounter = useSetAtom(counterAtom);
    const [run, setRun] = useAtom(runAtom);
    const [runing, setRuning] = useState(false);
    const countdownId = useRef<ReturnType<typeof setInterval>>();

    const stopTimer = useCallback(() => (clearInterval(countdownId.current), (countdownId.current = undefined)), []);

    useEffect(() => {
        if (run && startVal > 0) {
            stopTimer();
            setCounter(startVal);
            setRuning(true);
        } else {
            setRuning(false);
        }
    }, [run, setCounter]);

    useEffect(() => {
        if (runing) {
            countdownId.current = setInterval(() => {
                setCounter((v) => {
                    v--;
                    v < 0 && setRun(false);
                    return v;
                });
            }, 1000);
        } else {
            stopTimer();
            setCounter(-1);
        }
    }, [runing, setCounter]);

    useEffect(() => stopTimer, []);
}
