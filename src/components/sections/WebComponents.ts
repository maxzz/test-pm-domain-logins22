/** /
import styles from "../../index.css?inline";

//console.log('styles', styles);

class Example extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const styleNode = document.createElement('style');
        styleNode.innerHTML = styles;
        shadow.appendChild(styleNode);

        // const button = document.createElement("button");
        // button.onclick = () => alert("Hi");
        // button.innerText = "Hello";

        const button = document.createElement("div");
        //button.onclick = () => alert("Hi");
        button.innerHTML = `<button class="px-4 py-1.5 hover:bg-slate-300 focus:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 active:scale-[.97] border-slate-600 border rounded select-none"><slot>label</slot></button>`;

        // const className = "px-2 py-1 border rounded bg-sky-500";
        // button.className = className;

        //button.className = "px-2 py-1 border rounded bg-sky-500";
        //const classNames = '<div class="px-2 py-1 border rounded bg-sky-500"></div>';

        shadow.append(button);
    }
}

customElements.define("my-component", Example);
/**/

class CustomElementWrap extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const div = document.createElement("div");
        div.innerHTML = `<slot>label</slot>`;

        shadow.append(div);
    }
}

customElements.define("tm-wrap", CustomElementWrap);


export { };

