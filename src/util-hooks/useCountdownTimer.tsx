import { useCallback, useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai";

type useCountdownTimerProps = {
    intervalVal: number;
    countdownAtom: PrimitiveAtom<number>;
    runCountdownAtom: PrimitiveAtom<boolean>;
};

export function useCountdownTimer({ intervalVal, countdownAtom, runCountdownAtom }: useCountdownTimerProps) {
    const setCounter = useSetAtom(countdownAtom);
    const [run, setRun] = useAtom(runCountdownAtom);
    const [runing, setRuning] = useState(false);

    const countdownId = useRef<ReturnType<typeof setInterval>>();

    const stopTimer = useCallback(
        () => {
            clearInterval(countdownId.current);
            countdownId.current = undefined;
        }, []
    );

    useEffect(
        () => {
            if (run && intervalVal > 0) {
                stopTimer();
                setCounter(intervalVal);
                setRuning(true);
            } else {
                setRuning(false);
            }
        }, [run, setCounter]
    );

    useEffect(
        () => {
            if (runing) {
                countdownId.current = setInterval(
                    () => {
                        setCounter(
                            (v) => {
                                v--;
                                v < 0 && setRun(false);
                                return v;
                            }
                        );
                    }, 1000
                );
            } else {
                stopTimer();
                setCounter(-1);
            }
        }, [runing, setCounter]
    );

    useEffect(() => stopTimer, []);
}
