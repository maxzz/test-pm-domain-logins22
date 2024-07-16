import { CountdownDisplay } from './1-countdown-display';
import { AlienLogo } from './2-alien-logo';
import { NavLinks } from './3-nav-links';
import { IconHeroLines, IconHIDLogo } from '../ui/icons/UIIcons';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

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

                            <div className="font-old-normal pb-1">
                                PM Credential Test Pages 2024
                            </div>
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