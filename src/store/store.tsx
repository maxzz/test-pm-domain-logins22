import { atom, Getter } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region LocalStorage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        showSearchPage: boolean;
        loginAuser: string;
        loginApass: string;
        loginBuser: string;
        loginBpass: string;
    };



    export let initialData: Store = {
        showSearchPage: false,
        loginAuser: '',
        loginApass: '',
        loginBuser: '',
        loginBpass: '',
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
            loginAuser: get(loginAuserAtom),
            loginApass: get(loginApassAtom),
            loginBuser: get(loginBuserAtom),
            loginBpass: get(loginBpassAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

//#endregion LocalStorage

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({get}) => Storage.save(get));

export const loginAuserAtom = atomWithCallback(Storage.initialData.loginAuser, ({get}) => Storage.save(get));
export const loginApassAtom = atomWithCallback(Storage.initialData.loginApass, ({get}) => Storage.save(get));
export const loginBuserAtom = atomWithCallback(Storage.initialData.loginBuser, ({get}) => Storage.save(get));
export const loginBpassAtom = atomWithCallback(Storage.initialData.loginBpass, ({get}) => Storage.save(get));
