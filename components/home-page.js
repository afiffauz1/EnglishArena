class Homepage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: "open"
        })
    }

    connectedCallback() {
        this.renderHome();
    }

    renderHome() {
        this.shadow.innerHTML = `
        <link rel="stylesheet" href="../css/materialize.min.css" type="text/css">
        <link rel="stylesheet" href="../css/own-style.css">

        <div class="banner"></div>
        <div class="row">
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="../img/banner-table.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Tables</span>
                    <p><a class="btn pink lighten-2" href="/tables">Discover More</a></p>
                </div>
            </div>
        </div>
    
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="../img/banner-squad.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Teams</span>
                    <p><a class="btn pink lighten-2" href="/teams">Discover More</a></p>
                </div>
            </div>
        </div>
    
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="../img/banner-fav.jpg">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Favorites</span>
                    <p><a class="btn pink lighten-2" href="/favorites">Discover More</a></p>
                </div>
            </div>
        </div>
    
    </div>
        `
    }
}

customElements.define('home-page', Homepage);