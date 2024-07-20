import { useCallback, useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";

type useCountdownTimerProps = {
    intervalSecVal: number;
    counterAtom: PrimitiveAtom<number>;
    runAtom: PrimitiveAtom<boolean>;
};

export function useCountdownTimer({ intervalSecVal, counterAtom, runAtom }: useCountdownTimerProps) {
    const setCounter = useSetAtom(counterAtom);
    const [isRunning, setIsRunning] = useAtom(runAtom);

    const [localIsRunning, setLocalIsRunning] = useState(false);
    const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

    const stopInterval = useCallback(() => { clearInterval(intervalIdRef.current); (intervalIdRef.current = undefined); }, []);

    useEffect(() => {
        if (isRunning && intervalSecVal > 0) {
            stopInterval();
            setCounter(intervalSecVal);
            setLocalIsRunning(true);
        } else {
            setLocalIsRunning(false);
        }
    }, [isRunning, setCounter]);

    useEffect(() => {
        if (localIsRunning) {
            intervalIdRef.current = setInterval(() => {
                setCounter((v) => {
                    v--;
                    v < 0 && setIsRunning(false);
                    return v;
                });
            }, 1000);
        } else {
            stopInterval();
            setCounter(-1);
        }
    }, [localIsRunning, setCounter]);

    useEffect(() => stopInterval, []);
}
