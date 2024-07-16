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
/**/

import r2wc from '@r2wc/react-to-web-component';
// import styles from "../../index.css?inline";

// import React from 'react';
// import ReactDom from 'react-dom';
// import reactToWebComponent from 'react-to-webcomponent';
// import { Greeting } from './A1_Forms';
//
// const WebGreeting = reactToWebComponent(Greeting, React, ReactDom, { shadow: true });
//const WebGreeting = reactToWebComponent(A1_FormCPass, React, ReactDom, { shadow: true });

import { A1_FormCPass_Raw, A1_FormLogin_Raw, } from '../1-forms';

// const WebLogin = webComponentWrap(A1_FormLogin_Raw, { shadow: true, css: styles });
// const WebCPass = webComponentWrap(A1_FormCPass_Raw, { shadow: true, css: styles });

const WebLogin = r2wc(A1_FormLogin_Raw);
const WebCPass = r2wc(A1_FormCPass_Raw);

customElements.define("web-wrapshadow-login", WebLogin);
customElements.define("web-wrapshadow-cpass", WebCPass);
