import { atom, Getter } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

//#region LocalStorage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        showSearchPage: boolean;
    };

    export let initialData: Store = {
        showSearchPage: false,
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
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

//#endregion LocalStorage

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({get}) => Storage.save(get));