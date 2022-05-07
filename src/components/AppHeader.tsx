import React, { useRef } from 'react';
import { IconHero, IconHIDLogo } from './UI/UIIcons';
import curvesSvg from '../assets/curves.svg';
import { a, config, easings, useSpring } from '@react-spring/web';


export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

export function AppHeader() {
    const styles = useSpring({
        fill: 'transparent',
        strokeWidth: .2,
        stroke: 'transparent',
        scale: 1,
        from: {
            fill: 'black',
            stroke: 'red',
            strokeWidth: 0,
            scale: 0
        },
        config: { easing: easings.easeOutCubic, duration: 3000 }
    });
    const ref = useRef<SVGSVGElement>(null);
    return (<>
        <div className="bg-[#003165] shadow-sm cursor-default"
            style={{ backgroundImage: `url(${curvesSvg})`, backgroundSize: '100% 90%', backgroundRepeat: 'no-repeat' }}
        > {/* bg-[#003f82] */}

            <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-20 py-2 flex items-center justify-center bg-white rounded-md">
                        <IconHIDLogo className="px-2" stroke="#002f87" strokeWidth={0.2} fill="none" />
                    </div>
                    <div className="pb-1 text-3xl tracking-tighter font-light text-slate-100 uppercase whitespace-nowrap" style={textShadow}>
                        PM Credential Test Pages
                        <a.div style={styles} className="">
                            <IconHIDLogo />
                        </a.div>

                        {/* <a.div style={styles} className="">
                            <IconHero />
                        </a.div> */}

                    </div>
                </div>
            </div>
        </div>
        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}
