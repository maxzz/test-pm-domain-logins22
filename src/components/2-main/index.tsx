import { App_Header } from '../1-header';
import { Section_LoginArea } from '../sections/5-section-login-area';
import { App3_Footer } from '../3-footer';
import { classNames } from '@/utils';

export function App_Main() {
    return (
        <div className="h-screen flex flex-col text-[#001845]">
            <App_Header />

            <div
                className={classNames("flex-1 overflow-y-auto", "bg-gradient-to-r from-slate-100 to-slate-50")}
                style={{ 
                    overflow: 'overlay',
                    // backgroundImage: 'linear-gradient(135deg, rgb(210 232 255) 10%, transparent)',
                    // backgroundImage: 'linear-gradient(135deg, transparent 1%, #003165 10%, transparent)',
                    // backgroundImage: 'linear-gradient(135deg, transparent, 10%, #003165, 50%, transparent)',
                    // backgroundImage: 'linear-gradient(45deg, red, 20%, #003165, transparent)',
                    //backgroundImage: 'linear-gradient(45deg, #003165, transparent)',
                }}
            >
                <div className="h-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                    <div className="h-full grid grid-cols-1">
                        <Section_LoginArea />
                    </div>
                </div>
            </div>

            <App3_Footer />
        </div>
    );
}
