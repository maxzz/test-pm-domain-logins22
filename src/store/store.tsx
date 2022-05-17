import { atom, Getter, PrimitiveAtom, SetStateAction } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';

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
            doInterval: false,
            interval: 10,
            pageReload: false,
        },
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
                doInterval: get(screenLoginOptionAtoms.doIntervalAtom),
                interval: get(screenLoginOptionAtoms.intervalAtom),
                pageReload: get(screenLoginOptionAtoms.pageReloadAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

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

export const navOptionAtoms: Atomize<NavOptions> & {
    blankScreenAtom: PrimitiveAtom<boolean>;
} = {
    screenIdxAtom: atomWithCallback(Storage.initialData.navOptions.screenIdx, Storage.save),
    showSearchAtom: atomWithCallback(Storage.initialData.navOptions.showSearch, ({ get, set, nextValue }) => {
        if (nextValue) {
            set(screenLoginOptionAtoms.doIntervalAtom, false);
        }
        Storage.save({ get });
    }),
    blankScreenAtom: atom<boolean, SetStateAction<boolean>>(
        (get) => get(_blankScreenAtom),
        (get, set, value: SetStateAction<boolean>) => {
            const show = typeof value === 'function' ? value(get(_blankScreenAtom)) : value;
            !show && get(screenLoginOptionAtoms.doIntervalAtom) && set(runCountdownAtom, true);
            set(_blankScreenAtom, show);
        }
    ),
};

export const isLoginScreenAtom = atom((get) => /* get(navOptionAtoms.screenIdxAtom) === 0 && */ !get(navOptionAtoms.showSearchAtom));
export const doNextScreenAtom = atom(null, (get, set,) => set(navOptionAtoms.screenIdxAtom, get(navOptionAtoms.screenIdxAtom) ? 0 : 1));
export const doReloadScreenAtom = atom(null, (get, set,) => {
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
    doInterval: boolean;    // Use reload interval
    interval: number;       // Interval in seconds
    pageReload: boolean;    // Reload page vs. form
};

export const screenLoginOptionAtoms: Atomize<ScreenLoginOptions> = {
    revealAtom: atomWithCallback(Storage.initialData.screenLoginOptions.reveal, Storage.save),
    doIntervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.doInterval, Storage.save),
    intervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.interval, Storage.save),
    pageReloadAtom: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, Storage.save),
};

//#endregion ScreenOptions

//#region Countdown

const _countdownAtom = atom(-2); // -1 is for inactive; 0 = for window.location.reload(); -2 initial state on page load

export const countdownAtom = atom<number, SetStateAction<number>>(
    (get) => get(_countdownAtom),
    (get, set, value: SetStateAction<number>) => {
        const countdown = typeof value === 'function' ? value(get(_countdownAtom)) : value;
        countdown === 0 && get(screenLoginOptionAtoms.doIntervalAtom) && set(doReloadScreenAtom);
        set(_countdownAtom, countdown);
    }
);

export const _runCountdownAtom = atom<boolean>(false);

export const runCountdownAtom = atom<boolean, SetStateAction<boolean>>(
    (get) => get(_runCountdownAtom),
    (get, set) => {
        get(screenLoginOptionAtoms.intervalAtom);
        set(_runCountdownAtom, get(screenLoginOptionAtoms.doIntervalAtom));
    }
);

//#endregion Countdown

//TODO: check validity of intervalVal
