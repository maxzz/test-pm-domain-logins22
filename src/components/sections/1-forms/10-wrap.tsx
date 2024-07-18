import { ReactNode, HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { screenLoginOptionAtoms } from "@/store/store";
import { classNames } from "@/utils";

type FormWrapperProps = {
    children: ReactNode;
    level?: number;
} & HTMLAttributes<HTMLElement>;

export function Wrap({ children, level = 3, className }: FormWrapperProps) {
    const useWebComponents = useAtomValue(screenLoginOptionAtoms.useWebCompAtom);
    const nestLevel = useAtomValue(screenLoginOptionAtoms.nestLevelAtom);

    if (!useWebComponents) {
        return (<>
            {children}
        </>);
    }

    return (<>
        {nestLevel >= level
            ? (
                <div className={classNames("relative outline outline-1 outline-sky-500/50", className)}>
                    <div className="absolute left-1 top-0 z-10 text-[.65rem] text-sky-500">
                        {level}
                    </div>

                    {/* <tm-wrap>{children}</tm-wrap> */}
                    <tm-wrap>
                        <div slot="tm-default">
                            {children}
                        </div>
                    </tm-wrap>
                </div>
            )
            : null
        }
    </>);
}
