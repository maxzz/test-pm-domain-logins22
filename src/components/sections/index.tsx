import { A2_Controls } from './3-controls';
import { A3_Screens } from './4-screens';

export function Section_LoginArea() {
    return (
        <div className="pb-4 h-full flex flex-col justify-between text-slate-900">
            <A3_Screens />
            <A2_Controls />
        </div>
    );
}
