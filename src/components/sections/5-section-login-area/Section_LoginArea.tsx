import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { countdownAtom, runCountdownAtom, screenLoginOptionAtoms } from '@/store/store';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { A2_Controls } from '../3-controls/A2_Controls';
import { A3_Screens } from '../4_screens/A3_Screens';

function CountdownTimer() {
    const doInterval = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const intervalVal = useAtomValue(screenLoginOptionAtoms.intervalAtom);

    useCountdownTimer({ startVal: intervalVal, counterAtom: countdownAtom, runAtom: runCountdownAtom });

    const runCountdown = useSetAtom(runCountdownAtom);
    useEffect(() => runCountdown(doInterval), [doInterval, intervalVal]);
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
