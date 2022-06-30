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



//import styles from "../../index.css?inline";

import React from 'react';
import ReactDom from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import { Greeting } from './A1_Forms';


const WebGreeting = reactToWebComponent(Greeting, React, ReactDom, { shadow: true });

customElements.define("web-greeting", WebGreeting);

