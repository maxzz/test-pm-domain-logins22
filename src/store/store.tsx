import React from 'react';
import { atom, Getter, Setter, useAtom, useAtomValue } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { useUpdateAtom } from 'jotai/utils';

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

export const navOptionAtoms: Atomize<NavOptions> = {
    screenIdxAtom: atomWithCallback(Storage.initialData.navOptions.screenIdx, Storage.save),
    showSearchAtom: atomWithCallback(Storage.initialData.navOptions.showSearch, Storage.save),
};

export const isLoginScreenAtom = atom((get) => /* get(navOptionAtoms.screenIdxAtom) === 0 && */ !get(navOptionAtoms.showSearchAtom));
export const doNextScreenAtom = atom(null, (get, set,) => set(navOptionAtoms.screenIdxAtom, get(navOptionAtoms.screenIdxAtom) ? 0 : 1));
export const doReloadScreenAtom = atom(null, (get, set,) => {
    //set(navOptionAtoms.screenIdxAtom, get(navOptionAtoms.screenIdxAtom) ? 0 : 1);
    //set(navOptionAtoms.screenIdxAtom, get(navOptionAtoms.screenIdxAtom));

    // const c = get(navOptionAtoms.screenIdxAtom);
    // set(navOptionAtoms.screenIdxAtom, -1);
    // set(navOptionAtoms.screenIdxAtom, c);

    set(doNextScreenAtom);
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
    doIntervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.doInterval, doIntervalFn),
    intervalAtom: atomWithCallback(Storage.initialData.screenLoginOptions.interval, Storage.save),
    pageReloadAtom: atomWithCallback(Storage.initialData.screenLoginOptions.pageReload, Storage.save),
};

function doIntervalFn({ get, set, nextValue }: { get: Getter, set: Setter; nextValue: boolean; }) {
    Storage.save({ get });

    // if (nextValue) {
    //     console.log('setTimer');
    // } else {
    //     console.log('clear');
    // }
};
/*
function useCountdown({}:{}) {
    const doInterval = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const intervalVal = useAtomValue(screenLoginOptionAtoms.intervalAtom);

    const reloadTimeoutID = React.useRef<ReturnType<typeof setTimeout>>();
    const [countdown, setCountdown] = React.useState(0);
    
    if (doInterval) {
        clearTimeout(reloadTimeoutID.current);

        reloadTimeoutID.current = setTimeout(() => {
            reloadTimeoutID.current = undefined;
            //window.location.reload();
        }, intervalVal * 1000);

    } else {
        
    }
}

function Timer() {
    let timerID = 0;
    return () => ({
        start: () => {},
        stop: () => {},
    })
}
*/

export function useCountdown() {
    const doInterval = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const intervalVal = useAtomValue(screenLoginOptionAtoms.intervalAtom); // TODO: check validity

    const countdownId = React.useRef<ReturnType<typeof setInterval>>();
    const [countdown, setCountdown] = React.useState(0);

    React.useEffect(() => {
        function clearCount() {
            clearInterval(countdownId.current);
            countdownId.current = undefined;
        }

        if (doInterval && intervalVal > 0) {
            clearCount();
            setCountdown(intervalVal);

            countdownId.current = setInterval(() => {
                //window.location.reload();
                setCountdown((v) => {
                    v--;
                    // if (v <= 0) {
                    //     clearCount();
                    // }
                    if (v < 0) {
                        v = intervalVal;
                    }
                    return v;
                });
            }, 1000);

        } else {
            clearCount();
            setCountdown(0);
        }

    }, [doInterval, intervalVal]);

    React.useEffect(() => {
        return () => {
            console.log('unloaded----------');

            clearInterval(countdownId.current);
        };
    }, []);

    return {
        doInterval,
        intervalVal,
        countdown,
    };
}

export function watchCountdownAtom() {
    const doInterval = useAtomValue(screenLoginOptionAtoms.doIntervalAtom);
    const intervalVal = useAtomValue(screenLoginOptionAtoms.intervalAtom); // TODO: check validity

    const countdownId = React.useRef<ReturnType<typeof setInterval>>();
    const setCountdown = useUpdateAtom(countdownAtom);

    React.useEffect(() => {
        function clearCount() {
            clearInterval(countdownId.current);
            countdownId.current = undefined;
        }

        if (doInterval && intervalVal > 0) {
            clearCount();
            setCountdown(intervalVal);

            countdownId.current = setInterval(() => {
                //window.location.reload();
                setCountdown((v) => {
                    v--;
                    // if (v <= 0) {
                    //     clearCount();
                    // }
                    if (v < 0) {
                        v = intervalVal;
                    }
                    return v;
                });
            }, 1000);

        } else {
            clearCount();
            setCountdown(-1);
        }

    }, [doInterval, intervalVal]);

    React.useEffect(() => {
        return () => {
            console.log('unloaded----------watchCountdownAtom');

            clearInterval(countdownId.current);
        };
    }, []);
}

export const countdownAtom = atom(-1); // -1 is for inactive

/*
            const intervalEnabled = ref(true);
            const intervalIsValid = (v: number) => !isNaN(v) && v > 0 && v <= 900;
            const intervalCountdown = ref(0);

            let reloadTimeoutID = 0;
            let countdownID = 0;
            function startInterval(runNow: boolean) {

                if (runNow) {
                    clearTimeout(reloadTimeoutID);
                    reloadTimeoutID = setTimeout(() => {
                        reloadTimeoutID = 0;
                        window.location.reload();
                    }, intervalVal.value * 1000);

                    clearInterval(countdownID);
                    countdownID = 0;

                    intervalCountdown.value = intervalVal.value;
                    countdownID = setInterval(() => intervalCountdown.value--, 1000);

                } else {
                    clearTimeout(reloadTimeoutID);
                    reloadTimeoutID = 0;

                    clearInterval(countdownID);
                    countdownID = 0;
                }
            }

*/

//#endregion ScreenOptions
