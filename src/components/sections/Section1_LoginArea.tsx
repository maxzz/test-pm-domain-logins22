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

function LoginView({ suffix = '' }: { suffix?: string; }) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="">
                <label className="relative">
                    <input
                        className="py-1 peer border-b focus:border-b-2 focus:border-b-blue-600 focus:outline-none transition-colors bg-red-400"
                        id={`user${suffix}`}
                        type="text"
                        placeholder="Username11"
                        autoComplete="username"
                    />

                    {/* <div className="absolute left-0 top-0 peer-focus:text-xs cursor-text transition-all">Username</div> */}
                    <div className="absolute left-0 top-0 peer-focus:-top-5 peer-focus:text-xs cursor-text transition-all">Username</div>
                    {/* <div className="tw\focus:not(:focus-visible):outline-none absolute left-0 top-1 peer-focus:-top-5 peer-focus:text-xs cursor-text transition-all">Username</div> */}
                </label>
            </div>

            <label className="relative text-red-700 text-base">
                <input
                    className="peer py-1 px-1 border-b focus:border-b-2 focus:border-b-blue-600 focus:outline-none placeholder-transparent transition-colors bg-purple-100"
                    id={`user${suffix}`}
                    placeholder="Username"
                    type="text"
                />

                <div
                    className={`absolute
                    left-1
                    
                    top-1/2
                    -translate-y-8
                    peer-focus:-translate-y-8
                    peer-placeholder-shown:-translate-y-1/2


                    text-xs
                    peer-focus:text-xs
                    peer-placeholder-shown:[font-size:inherit]

                    [color:inherit]
                    peer-focus:[color:inherit]
                    peer-placeholder-shown:text-slate-400

                    cursor-text
                    transition-transform 
                    `}>
                    Username
                </div>
            </label>

            <hr />

            <label className="relative text-base">
                <input
                    className="peer float-input bg-red-500"
                    id={`user${suffix}`}
                    placeholder="Username"
                    type="text"
                />

                <div
                    className="float-label"
                    >
                    Username
                </div>
            </label>

            <hr />

            <div className="relative">
                <input className="peer placeholder-transparent form-input" type="text" id="name" placeholder="Name" />

                <label htmlFor="name"
                    className="absolute top-1/2 -translate-y-12 left-2 peer-focus:-translate-y-12 transition-transform peer-placeholder-shown:-translate-y-1/2">
                    Name
                </label>
            </div>

            {/* <label>
                <div className="">Password</div>
                <input id={`pass${suffix}`} type="password" placeholder="Password" autoComplete="current-password" />
            </label> */}
        </div>
    );
}

export function Section1_LoginArea() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            <PreviewContainer />
            <LoginView />
        </div>
    );
}
