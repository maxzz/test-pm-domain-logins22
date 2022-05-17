import React from "react";

export function useCountdownTimer({ startVal, setValue }: { startVal: number; setValue: React.Dispatch<React.SetStateAction<number>>; }) {

    const [run, setRun] = React.useState(false);
    const countdownId = React.useRef<ReturnType<typeof setInterval>>();

    const stop = React.useCallback(() => (clearInterval(countdownId.current), (countdownId.current = undefined)), []);
    const start = React.useCallback(() => setRun(true), []);

    React.useEffect(() => {
        if (run && startVal > 0) {
            stop();
            setValue(startVal);
            countdownId.current = setInterval(() => {
                setValue((v) => {
                    v--;
                    v < 0 && stop();
                    return v;
                });
            }, 1000);
        } else {
            stop();
            setValue(-1);
        }
    }, [run, startVal, setValue]);

    React.useEffect(() => stop, []);

    return { start, stop, };
}
