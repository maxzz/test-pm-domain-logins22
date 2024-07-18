import { useSetAtom } from "jotai";
import { navOptionAtoms, credAtoms } from "@/store/store";
import { IconSearch } from "@/components/ui/icons";
import { LoginTitle } from "./1-login-title";
import { FieldUser } from "./2-field-user";
import { FieldSubmit } from "./4-field-submit";
import { boxShadow } from "./11-form-login-raw";

export function A1_FormSearch({ suffix = '' }: { suffix?: string; }) {
    const showSearch = useSetAtom(navOptionAtoms.showSearchAtom);
    return (<>
        {/* Don't use 'search' word in form name or field names/IDs */}
        <form id="tm-sear-form" className="flex flex-col rounded-sm bg-slate-50 border-slate-300 border" style={boxShadow}>
            <LoginTitle
                label={<div className="text-xl tracking-tight text-slate-50 [text-shadow:1px_2px_2px_#8885] uppercase">Search</div>}
                logo={<div className="text-orange-500"><IconSearch className="w-12 h-12 fill-transparent stroke-slate-100" strokeWidth={2} /></div>} />

            <div className="px-4 mt-4 pt-4 pb-2 w-72 flex flex-col space-y-8">
                <div className="flex items-center space-x-2">
                    <FieldUser fieldAtom={credAtoms.searchAAAtom} fieldId={`sear${suffix}`} placeholder="Search" />
                    <div className="">
                        <select className="h-[37px] px-1 py-1.5 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-500 border-slate-300 border" name="state">
                            <option value="">CA</option>
                            <option value="">WA</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="self-end">
                <FieldSubmit className="m-4" label="Search" onClick={(e) => { e.preventDefault(); showSearch(false); }} />
            </div>
        </form>
    </>);
}
