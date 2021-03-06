import React from 'react';
import { useAtomValue } from 'jotai';
import { countdownAtom, isCountdownDoneAtom } from '@/store/store';
import { a, easings, useSpring, useTrail } from '@react-spring/web';
import { IconHero, IconHeroLines, IconHIDLogo } from './UI/icons/UIIcons';
import { SvgScreenLogin } from './UI/icons/screen-1-login';
import { SvgScreenCPass } from './UI/icons/screen-2-cpass';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

function CountdownDisplay() {
    const countdown = useAtomValue(countdownAtom);
    return (<>
        {countdown >= 0 && <div className="text-5xl text-slate-100">{countdown}</div>}
    </>);
}

const alienAnimProps = {
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
        ...alienAnimProps,
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
            api.start(alienAnimProps);
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
        <a.div style={styles} className="w-56 h-56 flex items-center justify-center">
            <IconHero className="" preserveAspectRatio="xMidYMid slice" />
        </a.div>

    );
}

/** /
const ALogin = a(SvgScreenLogin);
const ACPass = a(SvgScreenCPass);

function NavLinks0() {
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
/**/

const Trail: React.FC<{ open: boolean; }> = ({ open, children }) => {
    const items = React.Children.toArray(children);
    const trail = useTrail(items.length, {
        from: {
            opacity: 0,
            // x: 20,
            // y: -1000,
            x: 1000,
            height: '0px',
            scale: 0,
            backgroundColor: '#010101',
        },
        to: {
            opacity: open ? 1 : 0,
            x: open ? 0 : 1000,
            // x: open ? 0 : 20,
            // y: open ? 0 : -1000,
            height: open ? '48px' : '0px',
            scale: open ? 1 : 0,
            backgroundColor: open ? '#3b82f6' : '#010101',
        },
        delay: 500,
        config: {
            mass: 5, tension: 2000, friction: 200,
            //duration: 1000,
            //easing: easings.easeInOutCubic,
        },
    });
    return (<>
        {trail.map(({ height, ...style }, index) => (
            <a.div key={index} className="" style={style}>
                <a.div style={{ height }}>{items[index]}</a.div>
            </a.div>
        ))}
    </>);
};

function NavLinks() {
    const open = true;
    //const [open, setOpen] = React.useState(true);
    return (
        <div className="absolute bottom-1 left-2 h-12 flex ">
            {/* <input
                className="self-center mr-2 px-2 py-1 text-xs text-yellow-100 border-yellow-100 hover:bg-slate-900/50 border rounded active:scale-[.97] cursor-pointer"
                type="button"
                value="Reload"
                onClick={() => setOpen((v) => !v)}
            /> */}
            <div className="flex space-x-2">
                <Trail open={open}>
                    <SvgScreenLogin className="w-12 h-full overflow-hidden" preserveAspectRatio="none" />
                    <SvgScreenCPass className="w-12 h-full overflow-hidden" preserveAspectRatio="none" />
                    <SvgScreenLogin className="w-12 h-full overflow-hidden" preserveAspectRatio="none" />
                    <SvgScreenCPass className="w-12 h-full overflow-hidden" preserveAspectRatio="none" />
                </Trail>
            </div>
        </div>
    );
}

export function App_Header() {
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

            <div className="absolute inset-0 flex items-center justify-center">
                <AlienLogo />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <CountdownDisplay />
            </div>

            {/* <NavLinks0 /> */}
            <NavLinks />
        </div>

        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}

//TODO: alien animation on countdown come to 0
//TODO: add derived atom countdown === 0 to use inside AlienLogo
