import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { countdownAtom, runCountdownAtom, screenLoginOptionAtoms } from '@/store/store';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { Controls } from './A2_Controls';
import { Screens } from './A3_Screens';

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
            <Screens />
            <CountdownTimer />
            <Controls />
        </div>
    );
}

//TODO: make countdown more visible
//TODO: save reload page vs form
