import { atom, Getter, PrimitiveAtom } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
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
                reveal: get(screenLoginOptionsAtoms.reveal),
                doInterval: get(screenLoginOptionsAtoms.doInterval),
                interval: get(screenLoginOptionsAtoms.interval),
                pageReload: get(screenLoginOptionsAtoms.pageReload),
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

export const showSearchPageAtom = atomWithCallback(Storage.initialData.showSearchPage, ({ get }) => Storage.save(get));

export const loginOrCpassScreenAtom = atomWithCallback(Storage.initialData.loginOrCpassScreen, ({ get }) => Storage.save(get));

export const doNextLoginOrCPassScreenAtom = atom(null, (get, set,) => set(loginOrCpassScreenAtom, get(loginOrCpassScreenAtom) ? 0 : 1));
export const isLoginScreenAtom = atom((get) => get(loginOrCpassScreenAtom) === 0 && !get(showSearchPageAtom));

export type ScreenLoginOptions = {
    reveal: boolean; // Show or hide password field
    doInterval: boolean; // Use reload interval
    interval: number; // Interval in seconds
    pageReload: boolean; // Reload page vs. form
};

// type newKeys = `${keyof ScreenLoginOptions}Atom`; //OK
// var a: newKeys = 'revealAtom';
// export type S2 = {
//     [key in newKeys]: PrimitiveAtom<ScreenLoginOptions[key]>;
// };


// `${[key in keyof ScreenLoginOptions]}Atom`: PrimitiveAtom<ScreenLoginOptions[key]>;

// export type ScreenLoginOptionsAtoms<K = keyof ScreenLoginOptions> = {
//     K: PrimitiveAtom<ScreenLoginOptions[K]>;
// };

// export type ScreenLoginOptionsAtoms = {
//     [key in keyof ScreenLoginOptions] + 'Atom': PrimitiveAtom<ScreenLoginOptions[key]>;
// };

// export type ScreenLoginOptionsAtoms = {
//     [key in keyof ScreenLoginOptions] as `${key}Atom`: PrimitiveAtom<ScreenLoginOptions[key]>;
// };

export type ScreenLoginOptionsAtoms2 = {
    [key in keyof ScreenLoginOptions as `${key}Atom`]: PrimitiveAtom<ScreenLoginOptions[key]>;
};


export type ScreenLoginOptionsAtoms = {
    [key in keyof ScreenLoginOptions]: PrimitiveAtom<ScreenLoginOptions[key]>;
};

export const screenLoginOptionsAtoms: ScreenLoginOptionsAtoms = {
    reveal: atomWithCallback(Storage.initialData.screenLoginOptions.reveal, ({ get }) => Storage.save(get)),
    doInterval: atomWithCallback(Storage.initialData.screenLoginOptions.doInterval, ({ get }) => Storage.save(get)),
    interval: atomWithCallback(Storage.initialData.screenLoginOptions.interval, ({ get }) => Storage.save(get)),
    pageReload: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, ({ get }) => Storage.save(get)),
};


//https://github.com/sindresorhus/meow/issues/155#issuecomment-718639981
//
// type Getters<T> = {
//     [K in keyof T as `get${capitalize K}`]: () => T[K]
// };
// interface Person {
//     name: string;
//     age: number;
//     location: string;
// }
// type LazyPerson = Getters<Person>;

//https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#key-remapping-mapped-types
/*NO* /
type Getters2<T> = {
    [K in keyof T as `get${Capitalize<K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters2<Person>;
/**/
/*OK* /
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};

interface Circle {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// same as
//   type KindlessCircle = {
//       radius: number;
//   };
/**/
/*NO* /
type RemoveKindField<T> = {
    [K in keyof T as `${K}aa`]: T[K]
};

interface Circle {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// same as
//   type KindlessCircle = {
//       radius: number;
//   };
/**/

/*OK* /
type Getters<T> = { [P in keyof T & string as `get${Capitalize<P>}`]: () => T[P] };
type T50 = Getters<{ foo: string, bar: number }>;  // { getFoo: () => string, getBar: () => number }
/**/

/*OK*/
type Getters2<T> = {
    [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters2<Person>;
/**/
