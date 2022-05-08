import React from 'react';
import { AppHeader } from './AppHeader';
import { Section1_LoginArea } from './sections/Section1_LoginArea';
import { Section6_Footer } from './sections/Section6_Footer';

export function Frontpage() {
    return (
        <div className="h-screen flex flex-col text-[#001845]">
            <AppHeader />

            <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>

                <div className="h-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                    <div className="h-full grid grid-cols-1">
                        <Section1_LoginArea />
                    </div>

                </div>
            </div>

            <Section6_Footer />
        </div>
    );
}
