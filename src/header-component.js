import "../css/header-component.scss"

class HeaderComponent extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.menubar= null;
        this.render();
    }
    disconnectedCallback(){

    }

    render(){
        this.menubar = document.createElement('nav');
        this.menubar.classList.add('website-header');
        const h1 = document.createElement('h1');
        h1.innerText="National Evaluation Romania"
        this.menubar.append(h1);
        this.append(this.menubar);
    }

}

window.customElements.define('header-component',HeaderComponent);
