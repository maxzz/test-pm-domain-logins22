import { IconHero, IconHeroLines, IconHIDLogo } from './UI/UIIcons';
import { a, easings, useSpring } from '@react-spring/web';
import { SvgScreenLogin } from './UI/screen-1-login';
import { SvgScreenCPass } from './UI/screen-2-cpass';
import { useAtomValue } from 'jotai';
import { countdownAtom, isCountdownDoneAtom } from '@/store/store';
import React from 'react';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

function CountdownDisplay() {
    const countdown = useAtomValue(countdownAtom);
    return (<>
        {countdown >= 0 && <div className="absolute inset-0 flex items-center justify-center text-5xl text-slate-100">{countdown}</div>}
    </>);
}

const animValues = {
    from: {
        fill: '#5fa4ed',
        stroke: 'black',
        strokeWidth: 2,
        scale: 0
    },
    to: {
        fill: 'transparent',
        strokeWidth: .2,
        //stroke: 'transparent',
        stroke: 'rgb(100 116 139 / 0.2)',
        scale: 1,
    },
};

function AlienLogo() {
    const [styles, api] = useSpring(() => ({
        ...animValues,
        // from: {
        //     fill: '#5fa4ed',
        //     stroke: 'black',
        //     strokeWidth: 2,
        //     scale: 0
        // },
        // to: {
        //     fill: 'transparent',
        //     strokeWidth: .2,
        //     //stroke: 'transparent',
        //     stroke: 'rgb(100 116 139 / 0.2)',
        //     scale: 1,
        // },
        config: { easing: easings.easeOutCubic, duration: 1000 }
    }));
    // useAtom... call api
    const isCountdownDone = useAtomValue(isCountdownDoneAtom);

    // React.useEffect(() => {
    //     if (isCountdownDone) {
    //         //api.reset();
    //         api.
    //     }
    // }, [isCountdownDone]);

    React.useEffect(() => {
        if (isCountdownDone) {
            // api.set(animValues.from);
            // api.start(animValues.to);
            api.start(animValues);
        }
    }, [isCountdownDone]);

    // React.useEffect(() => {
    //     if (isCountdownDone) {
    //         api.set(animValues.to);
    //         api.start(animValues.from);
    //     }
    // }, [isCountdownDone]);

    // React.useEffect(() => {
    //     async function run() {
    //         if (isCountdownDone) {
    //             //console.log('111111');

    //             // api.set(animValues.to);
    //             // await api.start(animValues.from);
    //             api.set(animValues.from);
    //             await api.start(animValues.to);
    //         }
    //     }
    //     run();
    // }, [isCountdownDone]);

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <a.div style={styles} className="w-56 h-56 flex items-center justify-center">
                <IconHero className="" preserveAspectRatio="xMidYMid slice" />
            </a.div>
        </div>
    );
}

const ALogin = a(SvgScreenLogin);
const ACPass = a(SvgScreenCPass);

function NavLinks() {
    const styles = useSpring({
        from: { backgroundColor: '#0000', scale: 0 },
        to: { backgroundColor: '#3b82f6', scale: 1 }, //bg-blue-500
        config: { duration: 700, easing: easings.easeOutCubic },
        delay: 1000
    });
    return (
        <div className="absolute bottom-1 left-2">
            <div className="flex space-x-2">
                <ALogin style={styles} className="w-12 h-12" />
                <ACPass style={styles} className="w-12 h-12" />
                <ALogin style={styles} className="w-12 h-12" />
                <ACPass style={styles} className="w-12 h-12" />
            </div>
        </div>
    );
}

export function AppHeader() {
    return (<>
        <div className="h-2/5 relative bg-[#003165] shadow-sm cursor-default">

            <IconHeroLines className="absolute left-0 top-0 w-full h-full fill-transparent stroke-slate-500/20 stroke-[.05vmin]" preserveAspectRatio="none slice" />

            <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="pb-1 text-3xl tracking-tighter font-light text-slate-100 uppercase whitespace-nowrap" style={textShadow}>

                        <div className="flex items-center space-x-3">
                            <div className="w-20 py-2 flex items-center justify-center bg-white rounded-md">
                                <IconHIDLogo className="px-2" fill="#003165" />
                            </div>
                            <div className="font-old-normal pb-1">PM Credential Test Pages</div>
                        </div>
                    </div>
                </div>
            </div>

            <AlienLogo />
            <NavLinks />
            <CountdownDisplay />
        </div>

        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}

//TODO: alien animation on countdown come to 0
//TODO: add derived atom countdown === 0 to use inside AlienLogo
