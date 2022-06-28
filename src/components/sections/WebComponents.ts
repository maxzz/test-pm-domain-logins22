import styles from "../../index.css?inline";

//console.log('styles', styles);

class Example extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const styleNode = document.createElement('style');
        styleNode.innerHTML = styles;
        shadow.appendChild(styleNode);

        const button = document.createElement("button");
        button.onclick = () => alert("Hi");
        button.innerText = "Hello";

        const className = "px-2 py-1 border rounded bg-sky-500";
        button.className = className;
        //button.className = "px-2 py-1 border rounded bg-sky-500";
        //const classNames = '<div class="px-2 py-1 border rounded bg-sky-500"></div>';

        shadow.append(button);
    }
}

customElements.define("my-component", Example);

export {};
