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

function FieldUser({ suffix = '' }: { suffix?: string; }) {
    return (
        <label className="relative">
            <input
                className="peer float-input"
                id={`user${suffix}`}
                type="text"
                placeholder="Username"
            />

            <div className="float-label">
                Username
            </div>
        </label>
    );
}

function FieldPass({ suffix = '' }: { suffix?: string; }) {
    return (
        <label className="relative">
            <input
                className="peer float-input"
                id={`pass${suffix}`}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
            />

            <div className="float-label">
                Password
            </div>
        </label>
    );
}

function LoginView({ suffix = '' }: { suffix?: string; }) {
    return (
        <div className="flex flex-col space-y-4">
            <FieldUser suffix={suffix} />
            <FieldPass suffix={suffix} />
        </div>
    );
}

export function Section1_LoginArea() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            {/* <PreviewContainer /> */}
            <LoginView />
        </div>
    );
}
