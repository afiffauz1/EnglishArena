class PageNotFound extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "open"
        })
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        
        <h1 class="center">Page Not Found !!!</h1>
        `
    }
}

customElements.define('page-notfound', PageNotFound)