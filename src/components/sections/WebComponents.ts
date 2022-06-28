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

        const className = "bg-primary-500";
        button.className = className;
        //button.className = "bg-primary-100";
        //const classNames = '<div class="bg-primary-500"></div>';

        shadow.append(button);
    }
}

customElements.define("my-component", Example);

export {};