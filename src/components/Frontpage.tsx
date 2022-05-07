import React from 'react';
import { AppHeader } from './AppHeader';
import { Section0_Preview } from './sections/Section0_HeroSection';
import { Section6_Footer } from './sections/Section6_Footer';

export function Frontpage() {
    return (
        <div className="h-screen flex flex-col text-[#001845]">
            <AppHeader />
            <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>

                <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4">
                    <Section0_Preview />

                    <Section6_Footer />
                </div>
            </div>
        </div>
    );
}
