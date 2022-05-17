import { PrimitiveAtom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import React from "react";

export function useCountdownTimer({ startVal, counterAtom, runAtom }: { startVal: number; counterAtom: PrimitiveAtom<number>; runAtom: PrimitiveAtom<boolean>; }) {
    const setCounter = useUpdateAtom(counterAtom);
    const [run, setRun] = useAtom(runAtom);
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
                    v < 0 && setRun(false);
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
