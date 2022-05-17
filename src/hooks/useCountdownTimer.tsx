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
