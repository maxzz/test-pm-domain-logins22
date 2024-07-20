import { useSetAtom } from "jotai";
import { doNextScreenAtom, credAtoms } from "@/store/store";
import { FormHeader, FormType } from "./1-login-title";
import { FieldPass } from "./3-field-pass";
import { FieldSubmit } from "./4-field-submit";
import { boxShadow, formClasses } from "./49-shared-styles";
import { Wrap } from "./10-wrap";

const formFrameClasses = "px-4 mt-6 pt-4 pb-2 w-72 flex flex-col space-y-8";

export function A1_FormCPass_Raw({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);

    return (
        <Wrap level={1}>
            <form id="tm-cpass-a-form" className={formClasses} style={boxShadow}>

                <FormHeader formType={FormType.cpass} />

                <Wrap level={2} className="flex-1">
                    <div className={formFrameClasses}>
                        <Wrap><FieldPass fieldAtom={credAtoms.passwordAtom} fieldId={`old-pass${suffix}`} placeholder="Old Password" /></Wrap>
                        <Wrap><FieldPass fieldAtom={credAtoms.updtpassAtom} fieldId={`new-pass${suffix}`} placeholder="New Password" /></Wrap>
                        <Wrap><FieldPass fieldAtom={credAtoms.confpassAtom} fieldId={`cnf-pass${suffix}`} placeholder="Confirm New Password" /></Wrap>
                    </div>
                </Wrap>

                <div className="self-end">
                    <FieldSubmit className="m-4" label="Change" onClick={(e) => { e.preventDefault(); doNextLoginOrCPassScreen(); }} />
                </div>

            </form>
        </Wrap>
    );
}

export function A1_FormCPass({ suffix = '' }: { suffix?: string; }) {

    // The following code will trigger warning: Attempted to synchronously unmount a root while React was already rendering.
    // const useWebComponents = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    // if (useWebComponents) {
    //     return <div><web-wrapshadow-cpass /></div>;
    // }

    return (
        <A1_FormCPass_Raw suffix={suffix} />
    );
}
