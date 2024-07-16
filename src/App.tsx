import { App_Main } from './components/2-main';
import { UIToaster } from './components/ui/UiToaster';
import '@/components/sections/6-web-components';
import './App.scss';

function PopperRoot() {
    return (
        <div className="absolute z-50">
            <div id="portal"></div>
        </div>
    );
}

function App() {
    return (<>
        <UIToaster />
        <PopperRoot />

        <div className="min-h-full overflow-hidden bg-slate-50">
            <App_Main />
        </div>
    </>);
}

export default App;
