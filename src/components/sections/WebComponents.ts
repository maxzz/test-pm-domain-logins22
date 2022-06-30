/**/
class CustomElementWrap extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const div = document.createElement("div");
        div.innerHTML = `<slot name="tm-default">label</slot>`;

        shadow.append(div);
    }
}

customElements.define("tm-wrap", CustomElementWrap);

export { };
    import { webComponentWrap } from '@/utils/web-components';
/**/

import styles from "../../index.css?inline";

import React from 'react';
import ReactDom from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { A1_FormCPass, Greeting } from './A1_Forms';


// const WebGreeting = reactToWebComponent(Greeting, React, ReactDom, { shadow: true });
//const WebGreeting = reactToWebComponent(A1_FormCPass, React, ReactDom, { shadow: true });
const WebGreeting = webComponentWrap(A1_FormCPass, { shadow: true, css: styles });

customElements.define("web-wrapshadow", WebGreeting);

