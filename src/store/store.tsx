import { atom, Getter } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region Storage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        showSearchPage: boolean;
        loginOrCpassScreen: number;

        creds: Creds;
        screenLoginOptions: ScreenLoginOptions,

        loginAuser: string;
        loginApass: string;
        loginBuser: string;
        loginBpass: string;
        searchText: string;
    };

    export let initialData: Store = {
        showSearchPage: false,
        loginOrCpassScreen: 0,

        creds: {
            username: '',
            password: '',
            updtpass: '',
            confpass: '',
        },

        screenLoginOptions: {
            reveal: false,
            doInterval: false,
            interval: 10,
            pageReload: false,
        },

        loginAuser: '',
        loginApass: '',
        loginBuser: '',
        loginBpass: '',
        searchText: '',
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };
            } catch (error) {
            }
        }
    }
    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            showSearchPage: get(showSearchPageAtom),
            loginOrCpassScreen: get(loginOrCpassScreenAtom),

            creds: {
                username: get(credAtoms.usernameAtom),
                password: get(credAtoms.passwordAtom),
                updtpass: get(credAtoms.updtpassAtom),
                confpass: get(credAtoms.confpassAtom),
            },

            screenLoginOptions: {
                reveal: get(screenLoginOptionsAtoms.revealAtom),
                doInterval: get(screenLoginOptionsAtoms.doIntervalAtom),
                interval: get(screenLoginOptionsAtoms.intervalAtom),
                pageReload: get(screenLoginOptionsAtoms.pageReloadAtom),
            },

            loginAuser: get(loginAuserAtom),
            loginApass: get(loginApassAtom),
            loginBuser: get(loginBuserAtom),
            loginBpass: get(loginBpassAtom),
            searchText: get(searchTextAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: {get: Getter}) => Storage.saveDebounced(get);
}

//#endregion Storage

//#region Credential atoms

export const loginAuserAtom = atomWithCallback(Storage.initialData.loginAuser, Storage.save);
export const loginApassAtom = atomWithCallback(Storage.initialData.loginApass, Storage.save);
export const loginBuserAtom = atomWithCallback(Storage.initialData.loginBuser, Storage.save);
export const loginBpassAtom = atomWithCallback(Storage.initialData.loginBpass, Storage.save);
export const searchTextAtom = atomWithCallback(Storage.initialData.searchText, Storage.save);

type Creds = {
    username: string; // username
    password: string; // current password
    updtpass: string; // new password
    confpass: string; // confirm new password
};

type CredsAtoms = Atomize<Creds>;

const credAtoms: CredsAtoms = {
    usernameAtom: atomWithCallback(Storage.initialData.creds.username, Storage.save),
    passwordAtom: atomWithCallback(Storage.initialData.creds.password, Storage.save),
    updtpassAtom: atomWithCallback(Storage.initialData.creds.updtpass, Storage.save),
    confpassAtom: atomWithCallback(Storage.initialData.creds.confpass, Storage.save),
};

//#endregion Credential atoms

//#region Screens

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, Storage.save);
export const loginOrCpassScreenAtom = atomWithCallback(Storage.initialData.loginOrCpassScreen, Storage.save);
export const isLoginScreenAtom = atom((get) => get(loginOrCpassScreenAtom) === 0 && !get(showSearchPageAtom));
export const doNextLoginOrCPassScreenAtom = atom(null, (get, set,) => set(loginOrCpassScreenAtom, get(loginOrCpassScreenAtom) ? 0 : 1));

export type ScreenLoginOptions = {
    reveal: boolean;        // Show or hide password field
    doInterval: boolean;    // Use reload interval
    interval: number;       // Interval in seconds
    pageReload: boolean;    // Reload page vs. form
};

export type ScreenLoginOptionsAtoms = Atomize<ScreenLoginOptions>;

export const screenLoginOptionsAtoms: ScreenLoginOptionsAtoms = {
    revealAtom: atomWithCallback(Storage.initialData.screenLoginOptions.reveal, Storage.save),
    doIntervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.doInterval, Storage.save),
    intervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.interval, Storage.save),
    pageReloadAtom: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, Storage.save),
};

//#endregion Screens
