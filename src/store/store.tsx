import { atom, Getter, PrimitiveAtom, SetStateAction } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

export const enum CONST {
    MaxLevel = 3,
}

//#region Storage

namespace Storage {
    const KEY = 'test-domain-logins22';

    type Store = {
        creds: Creds;
        navOptions: NavOptions;
        screenLoginOptions: ScreenLoginOptions,
    };

    export let initialData: Store = {
        creds: {
            username: '',
            password: '',
            updtpass: '',
            confpass: '',
            searchAA: '',
        },
        navOptions: {
            screenIdx: 0,
            showSearch: false,
        },
        screenLoginOptions: {
            reveal: false,
            doRunInterval: false,
            intervalSec: 10,
            pageReload: false,
            useWebComp: false,
            nestLevel: CONST.MaxLevel,
        },
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                const { creds, navOptions, screenLoginOptions, } = obj;
                // initialData = { ...initialData, creds: {...creds}, navOptions: {...navOptions}, screenLoginOptions: {...screenLoginOptions}, };
                initialData.creds = { ...initialData.creds, ...creds };
                initialData.navOptions = { ...initialData.navOptions, ...navOptions };
                initialData.screenLoginOptions = { ...initialData.screenLoginOptions, ...screenLoginOptions };
            } catch (error) {
            }
        }
    }

    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            creds: {
                username: get(credAtoms.usernameAtom),
                password: get(credAtoms.passwordAtom),
                updtpass: get(credAtoms.updtpassAtom),
                confpass: get(credAtoms.confpassAtom),
                searchAA: get(credAtoms.searchAAAtom),
            },
            navOptions: {
                screenIdx: get(navOptionAtoms.screenIdxAtom),
                showSearch: get(navOptionAtoms.showSearchAtom),
            },
            screenLoginOptions: {
                reveal: get(screenLoginOptionAtoms.revealAtom),
                doRunInterval: get(screenLoginOptionAtoms.doRunIntervalAtom),
                intervalSec: get(screenLoginOptionAtoms.intervalSecAtom),
                pageReload: get(screenLoginOptionAtoms.pageReloadAtom),
                useWebComp: get(screenLoginOptionAtoms.useWebCompAtom),
                nestLevel: get(screenLoginOptionAtoms.nestLevelAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

// console.log('level', CONST.MaxLevel);
// console.log('Storage', Storage.initialData);

//#endregion Storage

//#region Credential atoms

type Creds = {
    username: string;       // username
    password: string;       // current password
    updtpass: string;       // new password
    confpass: string;       // confirm new password
    searchAA: string;       // search text for AA screen
};

export const credAtoms: Atomize<Creds> = {
    usernameAtom: atomWithCallback(Storage.initialData.creds.username, Storage.save),
    passwordAtom: atomWithCallback(Storage.initialData.creds.password, Storage.save),
    updtpassAtom: atomWithCallback(Storage.initialData.creds.updtpass, Storage.save),
    confpassAtom: atomWithCallback(Storage.initialData.creds.confpass, Storage.save),
    searchAAAtom: atomWithCallback(Storage.initialData.creds.searchAA, Storage.save),
};

//#endregion Credential atoms

//#region NavOptions

type NavOptions = {
    screenIdx: number;      // login (0) or cpass (1) screen
    showSearch: boolean;    // show search page
};

const _blankScreenAtom = atom<boolean>(false); // show blank screen before login/cpass screen reload

export const navOptionAtoms: Atomize<NavOptions> & { blankScreenAtom: PrimitiveAtom<boolean>; } = {

    screenIdxAtom: atomWithCallback(Storage.initialData.navOptions.screenIdx, Storage.save),

    showSearchAtom: atomWithCallback(Storage.initialData.navOptions.showSearch,
        ({ get, set, nextValue }) => {
            if (nextValue) {
                set(screenLoginOptionAtoms.doRunIntervalAtom, false);
            }
            Storage.save({ get });
        }
    ),

    blankScreenAtom: atom<boolean, SetStateAction<boolean>>(
        (get) => get(_blankScreenAtom),
        (get, set, show: SetStateAction<boolean>) => {
            const v = typeof show === 'function' ? show(get(_blankScreenAtom)) : show;
            
            if (!v && get(screenLoginOptionAtoms.doRunIntervalAtom)) {
                set(runCountdownAtom, true);
            }
            set(_blankScreenAtom, v);
        }
    ),
};

export const isLoginScreenAtom = atom(
    (get) => /* get(navOptionAtoms.screenIdxAtom) === 0 && */ !get(navOptionAtoms.showSearchAtom),
    // OK but no need:
    // (get, set, value: SetStateAction<boolean>) => {
    //     const v = typeof value === 'function' ? value(!get(navOptionAtoms.showSearchAtom)) : value;
    //     set(navOptionAtoms.showSearchAtom, !v);
    // }
);

export const doNextScreenAtom = atom(
    null,
    (get, set,) => {
        set(navOptionAtoms.screenIdxAtom, get(navOptionAtoms.screenIdxAtom) ? 0 : 1);
    });

export const doReloadScreenAtom = atom(
    null,
    (get, set,) => {
        if (get(screenLoginOptionAtoms.pageReloadAtom)) {
            window.location.reload();
        } else {
            set(navOptionAtoms.blankScreenAtom, true);
        }
    });

//#endregion NavOptions

//#region ScreenOptions

type ScreenLoginOptions = {
    reveal: boolean;        // Show or hide password field
    doRunInterval: boolean; // Use reload interval
    intervalSec: number;    // Interval in seconds
    pageReload: boolean;    // Reload page vs. form
    useWebComp: boolean;    // Use WebComponents
    nestLevel: number;      // Show WebComponents at nested level N
};

export const screenLoginOptionAtoms: Atomize<ScreenLoginOptions> = {
    revealAtom: atomWithCallback(Storage.initialData.screenLoginOptions.reveal, Storage.save),
    doRunIntervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.doRunInterval, Storage.save),
    intervalSecAtom: atomWithCallback(Storage.initialData.screenLoginOptions.intervalSec, Storage.save),
    pageReloadAtom: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, Storage.save),
    useWebCompAtom: atomWithCallback(Storage.initialData.screenLoginOptions.useWebComp, Storage.save),
    nestLevelAtom: atomWithCallback(Storage.initialData.screenLoginOptions.nestLevel, Storage.save),
};

//#endregion ScreenOptions

//#region Countdown

const _countdownAtom = atom(-2); // -1 is for inactive; 0 = for window.location.reload(); -2 initial state on page load

export const countdownAtom = atom<number, SetStateAction<number>>(
    (get) => get(_countdownAtom),
    (get, set, value: SetStateAction<number>) => {
        const v = typeof value === 'function' ? value(get(_countdownAtom)) : value;

        if (v === 0 && get(screenLoginOptionAtoms.doRunIntervalAtom)) {
            set(doReloadScreenAtom);
        }
        set(_countdownAtom, v);
    }
);

export const isCountdownDoneAtom = atom<boolean>(
    (get) => {
        return get(_countdownAtom) === 0;
    }
);

export const runCountdownAtom = atom<boolean>(false);

//#endregion Countdown

//TODO: check validity of intervalVal
