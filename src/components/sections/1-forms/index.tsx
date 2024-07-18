import { useAtomValue } from "jotai";
import { screenLoginOptionAtoms } from "@/store/store";
import { A1_FormLogin_Raw } from "./11-form-login-raw";
import { A1_FormCPass_Raw } from "./12-form-cpass-raw";

export const Greeting = ({ name }: { name: string; }) => {
    return (
        <h1>Hello, {name} </h1>
    );
};

export function A1_FormLogin({ suffix = '' }: { suffix?: string; }) {
    const useWebComp = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    return useWebComp ? <web-wrapshadow-login /> : <A1_FormLogin_Raw suffix={suffix} />;
}

export function A1_FormCPass({ suffix = '' }: { suffix?: string; }) {
    const useWebComp = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    return useWebComp ? <web-wrapshadow-cpass /> : <A1_FormCPass_Raw suffix={suffix} />;
}

//TODO: Wrap: make the nested level more visible
