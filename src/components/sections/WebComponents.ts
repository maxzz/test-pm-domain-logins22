import { classNames } from "@/utils/classnames";

class Example extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const button = document.createElement("button");
        button.onclick = () => alert("Hi");
        button.innerText = "Hello";
        button.className = "bg-primary-100";
        shadow.append(button);
    }
}

customElements.define("my-component", Example);
