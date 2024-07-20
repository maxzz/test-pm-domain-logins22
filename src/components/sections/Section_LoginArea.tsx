import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { countdownAtom, runCountdownAtom, screenLoginOptionAtoms } from '@/store/store';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { A2_Controls } from './A2_Controls';
import { A3_Screens } from './A3_Screens';

function CountdownTimer() {
    const doRunInterval = useAtomValue(screenLoginOptionAtoms.doRunIntervalAtom);
    const intervalSecVal = useAtomValue(screenLoginOptionAtoms.intervalSecAtom);

    useCountdownTimer({ intervalSecVal, counterAtom: countdownAtom, runAtom: runCountdownAtom });

    const runCountdown = useSetAtom(runCountdownAtom);

    useEffect(() => runCountdown(doRunInterval), [doRunInterval, intervalSecVal]);
    
    return null;
}

export function Section_LoginArea() {
    return (
        <div className="flex flex-col justify-between text-slate-800">
            <A3_Screens />
            <CountdownTimer />
            <A2_Controls />
        </div>
    );
}

//TODO: make countdown more visible
//TODO: save reload page vs form
