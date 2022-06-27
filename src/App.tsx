import { App_Main } from './components/App2_Main';
import { UIToaster } from './components/UI/UiToaster';
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
