import { atom, Getter, PrimitiveAtom } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region LocalStorage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        showSearchPage: boolean;
        loginOrCpassScreen: number;

        loginAuser: string;
        loginApass: string;
        loginBuser: string;
        loginBpass: string;
        searchText: string;
    };

    export let initialData: Store = {
        showSearchPage: false,
        loginOrCpassScreen: 0,

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

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            showSearchPage: get(showSearchPageAtom),
            loginOrCpassScreen: get(loginOrCpassScreenAtom),

            loginAuser: get(loginAuserAtom),
            loginApass: get(loginApassAtom),
            loginBuser: get(loginBuserAtom),
            loginBpass: get(loginBpassAtom),
            searchText: get(searchTextAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

//#endregion LocalStorage

//#region Credential atoms

export const loginAuserAtom = atomWithCallback(Storage.initialData.loginAuser, ({ get }) => Storage.save(get));
export const loginApassAtom = atomWithCallback(Storage.initialData.loginApass, ({ get }) => Storage.save(get));
export const loginBuserAtom = atomWithCallback(Storage.initialData.loginBuser, ({ get }) => Storage.save(get));
export const loginBpassAtom = atomWithCallback(Storage.initialData.loginBpass, ({ get }) => Storage.save(get));
export const searchTextAtom = atomWithCallback(Storage.initialData.searchText, ({ get }) => Storage.save(get));

//#endregion Credential atoms

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({ get }) => Storage.save(get));

export const loginOrCpassScreenAtom = atomWithCallback(Storage.initialData.loginOrCpassScreen, ({ get }) => Storage.save(get));

export const doNextLoginOrCPassScreenAtom = atom(null, (get, set,) => set(loginOrCpassScreenAtom, get(loginOrCpassScreenAtom) ? 0 : 1));
export const isLoginScreenAtom = atom((get) => get(loginOrCpassScreenAtom) === 0 && !get(showSearchPageAtom));

export type ScreenLoginOptions = {
    revealAtom: boolean; // Show or hide password field
    doIntervalAtom: boolean; // Use reload interval
    intervalAtom: number; // Interval in seconds
    pageReloadAtom: boolean; // Reload page vs. form
};

export type ScreenLoginOptionsAtoms = {
    [key in keyof ScreenLoginOptions]: PrimitiveAtom<ScreenLoginOptions[key]>;
};

export const screenLoginOptions: ScreenLoginOptionsAtoms = {
    revealAtom: atom<boolean>(false),
    doIntervalAtom: atom<boolean>(false),
    intervalAtom: atom(10),
    pageReloadAtom: atom<boolean>(false),
};
