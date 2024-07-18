import { useAtomValue, useSetAtom } from "jotai";
import { doNextScreenAtom, credAtoms, screenLoginOptionAtoms } from "@/store/store";
import { IconLogin } from "@/components/ui/icons";
import { LoginTitle } from "./1-login-title";
import { FieldUser } from "./2-field-user";
import { FieldPass } from "./3-field-pass";
import { FieldSubmit } from "./4-field-submit";
import { boxShadow } from "./49-shared-styles";
import { Wrap } from "./10-wrap";

export function A1_FormLogin_Raw({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);

    return (
        <Wrap level={1}>
            <form id="tm-login-a-form" className="min-h-[24rem] flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>

                <LoginTitle
                    label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">User login</div>}
                    logo={<div className="inset-0"><IconLogin className="w-12 h-12 stroke-slate-400/50" /></div>}
                />

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
    const useWebComponents = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    return (
        useWebComponents
            ? <web-wrapshadow-login />
            : <A1_FormLogin_Raw suffix={suffix} />
    );
}
