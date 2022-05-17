import { IconHero, IconHeroLines, IconHIDLogo } from './UI/UIIcons';
import { a, easings, useSpring } from '@react-spring/web';
import { SvgScreenLogin } from './UI/screen-1-login';
import { SvgScreenCPass } from './UI/screen-2-cpass';
import { useAtomValue } from 'jotai';
import { countdownAtom } from '@/store/store';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

function CountdownDisplay() {
    const countdown = useAtomValue(countdownAtom);
    return (<>
        {countdown >= 0 && <div className="absolute right-4 bottom-2 text-slate-100">{countdown}</div>}
    </>);
}

export function AppHeader() {
    const styles = useSpring({
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
        config: { easing: easings.easeOutCubic, duration: 1000 }
    });
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
                            <div className="font-old-normal">PM Credential Test Pages</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
                <a.div style={styles} className="w-56 h-56 flex items-center justify-center">
                    <IconHero className="" preserveAspectRatio="xMidYMid slice" />
                </a.div>
            </div>

            <div className="absolute bottom-1 left-2">
                <div className="flex space-x-4">
                    <SvgScreenLogin className="w-12 h-12 bg-blue-500" />
                    <SvgScreenCPass className="w-12 h-12 bg-blue-500" />
                    <SvgScreenLogin className="w-12 h-12 bg-blue-500" />
                    <SvgScreenCPass className="w-12 h-12 bg-blue-500" />
                </div>
            </div>

            <CountdownDisplay />
        </div>

        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}
