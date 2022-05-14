import { atom, Getter } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region LocalStorage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        showSearchPage: boolean;
        loginOrCpassScreen: number;

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

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            showSearchPage: get(showSearchPageAtom),
            loginOrCpassScreen: get(loginOrCpassScreenAtom),

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
}

//#endregion LocalStorage

//#region Credential atoms

export const loginAuserAtom = atomWithCallback(Storage.initialData.loginAuser, ({ get }) => Storage.save(get));
export const loginApassAtom = atomWithCallback(Storage.initialData.loginApass, ({ get }) => Storage.save(get));
export const loginBuserAtom = atomWithCallback(Storage.initialData.loginBuser, ({ get }) => Storage.save(get));
export const loginBpassAtom = atomWithCallback(Storage.initialData.loginBpass, ({ get }) => Storage.save(get));
export const searchTextAtom = atomWithCallback(Storage.initialData.searchText, ({ get }) => Storage.save(get));

//#endregion Credential atoms

//#region Screens

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({ get }) => Storage.save(get));
export const loginOrCpassScreenAtom = atomWithCallback(Storage.initialData.loginOrCpassScreen, ({ get }) => Storage.save(get));
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
    revealAtom: atomWithCallback(Storage.initialData.screenLoginOptions.reveal, ({ get }) => Storage.save(get)),
    doIntervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.doInterval, ({ get }) => Storage.save(get)),
    intervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.interval, ({ get }) => Storage.save(get)),
    pageReloadAtom: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, ({ get }) => Storage.save(get)),
};

//#endregion Screens
