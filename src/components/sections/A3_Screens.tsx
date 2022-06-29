import { Atom, PrimitiveAtom, useAtomValue, useSetAtom } from "jotai";
import { navOptionAtoms } from "@/store/store";
import { a, AnimatedProps, config, easings, useSpring, useTransition } from "@react-spring/web";
import { A1_FormCPass, A1_FormLogin, A1_FormSearch } from "./A1_Forms";

function Mount({ showAtom, children }: { showAtom: Atom<boolean>; } & React.HTMLAttributes<HTMLDivElement>) {
    const show = useAtomValue(showAtom);
    const transitions = useTransition(show, {
        from: { y: -400, opacity: 0, },
        enter: { y: 0, opacity: 1, config: { duration: 500, easing: easings.easeOutCubic }, },
        leave: { y: -200, opacity: 0, config: { duration: 400, easing: easings.easeOutQuad }, /* onRest: () => console.log('done') */ },
        //config: { duration: 200, },
    });
    return transitions((styles, item) => item && (
        <a.div style={styles}>
            {children}
        </a.div>)
    );
}

function BlankScreen() {
    const blankScreen = useSetAtom(navOptionAtoms.blankScreenAtom);

    const styles = useSpring({
        from: { scaleY: 1, scaleX: 1, opacity: 1, background: '#94a3b8', },
        to: [
            { scaleY: .1, scaleX: .9, config: { duration: 700, } },
            { scaleY: 1, scaleX: 0, config: { duration: 1, } },
            { scaleY: 1, scaleX: .9, opacity: 0, config: { easing: easings.easeOutCubic, duration: 1000, } },
        ],
        //config: { duration: 400, },
        onRest: () => blankScreen(false),
    });//bg-orange-400/20
    return (
        <div className="relative w-full h-[24rem] flex items-center justify-center">
            <div className="text-2xl text-white">Reloading...</div>
            <a.div style={styles} className="absolute inset-0"></a.div>
        </div>
    );
}

const screens: ((props: AnimatedProps<{ style: React.CSSProperties; }>) => React.ReactElement)[] = [
    ({ style }: { style: any; }) => <a.div style={style}><A1_FormLogin suffix={'-1'} /></a.div>,
    ({ style }: { style: any; }) => <a.div style={style}><A1_FormCPass suffix={'-2'} /></a.div>,
];

export function A3_Screens() {
    const showSearch = useAtomValue(navOptionAtoms.showSearchAtom);
    //const blankScreen = true;
    const blankScreen = useAtomValue(navOptionAtoms.blankScreenAtom);
    const currentIdx = useAtomValue(navOptionAtoms.screenIdxAtom);

    const transitions = useTransition(currentIdx, {
        from: { opacity: 0, x: '150%', scale: 1, },
        enter: { opacity: 1, x: '0%', config: { easing: easings.easeInCubic, duration: 300, } },
        leave: { opacity: 0, x: '-150%', scale: 0, config: { easing: easings.easeInCubic, duration: 0, }, }, // or duration: 300
        config: { ...config.molasses },
        exitBeforeEnter: true,
        // onRest: (result, ctrl, item) => {
        //     console.log('%c--------------------------onRest %ccurrentIdx = %i%c %o %o', 'color: slateblue', colorIdx(), currentIdx, 'color: slateblue', { item }, { result }, { ctrl });
        // }
    });

    // const colorIdx = () => currentIdx === 0 ? 'color: orange' : 'color: khaki';
    // console.log('%c----------------------- render() %ccurrentIdx = %i', 'color: gray', colorIdx(), currentIdx);
    
    return (
        <div className="overflow-hidden">
            <div className="my-8 flex items-start justify-center">
                {blankScreen
                    ? <BlankScreen />
                    : showSearch
                        ?
                        <Mount showAtom={navOptionAtoms.showSearchAtom}>
                            <A1_FormSearch />
                        </Mount>
                        : <>
                            {transitions((styles, item, transition) => {
                                // console.log('%c...................transitions() currentIdx = %i %o phase %c%s%c transition', colorIdx(), currentIdx, { item }, 'color: green', transition.phase, 'color: gray', transition);

                                const Screen = screens[currentIdx];
                                return Screen ? <Screen style={styles} /> : null;
                            })}
                        </>
                }
            </div>
        </div>
    );
}
