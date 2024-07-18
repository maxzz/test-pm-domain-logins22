import { useSetAtom } from "jotai";
import { doNextScreenAtom, credAtoms } from "@/store/store";
import { LoginTitleLogin } from "./1-login-title";
import { FieldUser } from "./2-field-user";
import { FieldPass } from "./3-field-pass";
import { FieldSubmit } from "./4-field-submit";
import { boxShadow, formClasses } from "./49-shared-styles";
import { Wrap } from "./10-wrap";

export function A1_FormLogin_Raw({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);

    return (
        <Wrap level={1}>
            <form id="tm-login-a-form" className={`min-h-[24rem] ${formClasses}`} style={boxShadow}>

                <LoginTitleLogin />

                <Wrap level={2} className="flex-1">
                    <div className="flex-1 mt-2 px-4 pt-8 pb-2 w-72 flex flex-col space-y-8">
                        <Wrap><FieldUser fieldAtom={credAtoms.usernameAtom} fieldId={`user${suffix}`} placeholder="Username" /></Wrap>
                        <Wrap><FieldPass fieldAtom={credAtoms.passwordAtom} fieldId={`pass${suffix}`} placeholder="Password" /></Wrap>
                    </div>
                </Wrap>

                <div className="self-end">
                    <FieldSubmit className="m-4" label="Log in" onClick={(e) => { e.preventDefault(); doNextLoginOrCPassScreen(); }} />
                </div>

            </form>
        </Wrap>
    );
}

export function A1_FormLogin({ suffix = '' }: { suffix?: string; }) {

    // The following code will trigger warning: Attempted to synchronously unmount a root while React was already rendering.
    // const useWebComponents = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    // if (useWebComponents) {
    //     return <div><web-wrapshadow-login /></div>;
    // }

    return (
        <A1_FormLogin_Raw suffix={suffix} />
    );
}
