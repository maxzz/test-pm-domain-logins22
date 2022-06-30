import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'tm-wrap': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {class?: string | undefined};
            'web-greeting': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {class?: string | undefined};
        }
    }
}
