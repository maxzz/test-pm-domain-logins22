import { AppHeader } from '../1-header';
import { Section_LoginArea } from '../sections';
import { AppFooter } from '../3-footer';

const testAreaStyles = {
    overflow: 'overlay',
    // backgroundImage: 'linear-gradient(135deg, rgb(210 232 255) 10%, transparent)',
    // backgroundImage: 'linear-gradient(135deg, transparent 1%, #003165 10%, transparent)', // hid-bg
    // backgroundImage: 'linear-gradient(135deg, transparent, 10%, #003165, 50%, transparent)', // hid-bg
    // backgroundImage: 'linear-gradient(45deg, red, 20%, #003165, transparent)', // hid-bg
    // backgroundImage: 'linear-gradient(45deg, #003165, transparent)', // hid-bg
};

export function AppMain() {
    return (<>
        <AppHeader />

        <div className="flex-1 overflow-y-auto bg-gradient-to-r from-slate-100 to-slate-50" style={testAreaStyles}>
            <Section_LoginArea />
        </div>

        <AppFooter />
    </>);
}
