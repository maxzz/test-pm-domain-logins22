import { atom, Getter } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region LocalStorage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        // showLoginPage: boolean;
        // showCpassPage: boolean;
        showSearchPage: boolean;
        loginOrCpassScreen: number;

        loginAuser: string;
        loginApass: string;
        loginBuser: string;
        loginBpass: string;
        searchText: string;
    };

    export let initialData: Store = {
        // showLoginPage: false,
        // showCpassPage: false,
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
            // showLoginPage: get(showLoginPageAtom),
            // showCpassPage: get(showCpassPageAtom),
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

// export const showLoginPageAtom = atomWithCallback(Storage.initialData.showLoginPage, ({ get }) => Storage.save(get));
// export const showCpassPageAtom = atomWithCallback(Storage.initialData.showCpassPage, ({ get }) => Storage.save(get));
export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({ get }) => Storage.save(get));

export type SelectScreenType = 'login' | 'cpass' | 'search';

// export const doSelectScreenAtom = atom(null,
//     (get, set, value: SelectScreenType) => {
//         set(showLoginPageAtom, value === 'login');
//         set(showCpassPageAtom, value === 'cpass');
//         set(showSearchPageAtom, value === 'search');
//     }
// );

export const loginOrCpassScreenAtom = atomWithCallback(Storage.initialData.loginOrCpassScreen, ({ get }) => Storage.save(get));

export const doNextLoginOrCPassScreenAtom = atom(null,
    (get, set, ) => {
        set(loginOrCpassScreenAtom, get(loginOrCpassScreenAtom) ? 0 : 1);
    }
);
