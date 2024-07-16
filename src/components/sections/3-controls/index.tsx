import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doNextScreenAtom, isLoginScreenAtom, navOptionAtoms } from "@/store/store";
import { classNames } from "@/utils";
import { FormOptions } from "./3-form-options";
import { Mount } from "./4-mount";

const input1Classes = "size-5 form-checkbox text-slate-400 focus:ring-slate-500 focus:ring-1 rounded cursor-pointer";
const input2Classes = "\
px-4 py-1 \
border-slate-400 \
hover:bg-slate-300 \
focus:bg-slate-300 \
focus:ring-slate-500 focus:ring-1 focus:ring-offset-2 \
border rounded \
active:scale-[.97] \
cursor-pointer \
outline-none";

export function A2_Controls() {

    const [showSearch, setShowSearch] = useAtom(navOptionAtoms.showSearchAtom);
    const isLoginScreen = useAtomValue(isLoginScreenAtom);
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);

    return (
        <div className="mb-4 p-4 w-[290px] self-center bg-slate-100 border-slate-200 border rounded-sm flex justify-center select-none">
            <div className="flex flex-col space-y-4">
                {/*
                <MountOptions showAtom={isLoginScreenAtom}>
                    <FormOptions className={`${!isLoginScreen && 'invisible'}`} />
                </MountOptions>
                */}

                <FormOptions className={`${!isLoginScreen && 'invisible'}`} />

                <div className="h-9 flex items-end justify-between">

                    {/* Show search page */}
                    <label className="flex items-center justify-center space-x-2 cursor-pointer">
                        <input
                            data-dbg-tm
                            className={input1Classes}
                            type="checkbox" 
                            checked={showSearch} 
                            onChange={() => setShowSearch((v) => !v)}
                        />

                        <div>
                            Search page
                        </div>
                    </label>

                    {/* Next */}
                    <Mount showAtom={isLoginScreenAtom}>
                        <input
                            data-dbg-tm
                            className={classNames(input2Classes, /*showSearch && 'invisible'*/)}
                            type="button"
                            value="Next"
                            onClick={doNextLoginOrCPassScreen}
                            title="Next screen"
                        />
                    </Mount>

                </div>
            </div>
        </div>
    );
}

//TODO: hot keys for Use webComponents switch
