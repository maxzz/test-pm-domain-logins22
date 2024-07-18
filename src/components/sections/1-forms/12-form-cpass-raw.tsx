import { useAtomValue, useSetAtom } from "jotai";
import { doNextScreenAtom, credAtoms, screenLoginOptionAtoms } from "@/store/store";
import { IconCpass } from "@/components/ui/icons";
import { LoginTitle } from "./1-login-title";
import { FieldPass } from "./3-field-pass";
import { FieldSubmit } from "./4-field-submit";
import { boxShadow } from "./11-form-login-raw";
import { Wrap } from "./10-wrap";

export function A1_FormCPass_Raw({ suffix = '' }: { suffix?: string; }) {
    const doNextLoginOrCPassScreen = useSetAtom(doNextScreenAtom);
    return (
        <Wrap level={1}>
            <form id="tm-cpass-a-form" className="flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>
                <LoginTitle
                    label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Password Change</div>}
                    logo={<div className="inset-0"><IconCpass className="w-12 h-12 stroke-slate-400/50" /></div>} />
                <Wrap level={2} className="flex-1">
                    <div className="px-4 mt-6 pt-4 pb-2 w-72 flex flex-col space-y-8">
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
    const useWebComp = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    return (
        useWebComp
            ? <web-wrapshadow-cpass />
            : <A1_FormCPass_Raw suffix={suffix} />
    );
}
