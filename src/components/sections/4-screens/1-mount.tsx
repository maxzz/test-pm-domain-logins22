import { Atom, useAtomValue, useSetAtom } from "jotai";
import { a, AnimatedProps, config, easings, useSpring, useTransition } from "@react-spring/web";
import { navOptionAtoms } from "@/store/store";
import { A1_FormCPass, A1_FormLogin, A1_FormSearch } from "../1-forms";

export function Mount({ showAtom, children }: { showAtom: Atom<boolean>; } & React.HTMLAttributes<HTMLDivElement>) {
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
