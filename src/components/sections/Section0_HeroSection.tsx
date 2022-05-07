import { useRef } from 'react';
import { a, easings, useSpring } from '@react-spring/web';

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function PreviewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: 2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-400 overflow-hidden      text-center p-12" style={{ ...boxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="h-full object-cover">
                Place more here
            </a.div>
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };


export function Section0_Preview() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            <PreviewContainer />
        </div>
    );
}
