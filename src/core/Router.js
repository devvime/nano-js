export class Router {
    constructor(routes, hostSelector) {
        this.routes = routes;
        this.host = document.querySelector(hostSelector);
        this.currentInstance = null;
    }

    init() {
        window.addEventListener('popstate', () => this._handleRoute());
        document.addEventListener('click', e => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
        this._handleRoute();
    }

    navigate(path) {
        window.history.pushState(null, null, path);
        this._handleRoute();
    }

    _handleRoute() {
        const path = window.location.pathname;
        let match = this.routes.find(r => {
            const routeRegex = new RegExp("^" + r.path.replace(/:[^/]+/g, '([^/]+)') + "$");
            return path.match(routeRegex);
        });

        if (match) {
            const routeRegex = new RegExp("^" + match.path.replace(/:[^/]+/g, '([^/]+)') + "$");
            const params = path.match(routeRegex).slice(1);
            this._renderComponent(match.component, params);
        } else {
            this.host.innerHTML = '<h1>404 - Página não encontrada</h1>';
        }
    }

    async _renderComponent(ComponentClass, params) {
        if (this.currentInstance) await this.currentInstance.onDestroy();
        this.host.innerHTML = '';
        this.currentInstance = new ComponentClass({ params });
        await this.currentInstance._mount(this.host);
    }
}