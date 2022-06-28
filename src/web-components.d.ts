import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // 'my-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'tm-wrap': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
