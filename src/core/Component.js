import { createElement } from './Parser.js';

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = this._createReactiveState({});
        this.element = null;
    }

    _createReactiveState(initialState) {
        return new Proxy(initialState, {
            set: (target, key, value) => {
                if (target[key] === value) return true;
                target[key] = value;
                this._update();
                return true;
            }
        });
    }

    _update() {
        if (!this.element) return;
        
        // Preservação de Foco
        const activeElementTag = document.activeElement.tagName;
        const activeElementIndex = Array.from(this.element.querySelectorAll(activeElementTag)).indexOf(document.activeElement);
        const selectionStart = document.activeElement.selectionStart;
        const selectionEnd = document.activeElement.selectionEnd;

        const template = this.render();
        this.element.innerHTML = ''; 
        this.element.appendChild(createElement(template, this));

        if (activeElementIndex !== -1) {
            const newElements = this.element.querySelectorAll(activeElementTag);
            if (newElements[activeElementIndex]) {
                const el = newElements[activeElementIndex];
                el.focus();
                if (selectionStart !== null && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
                    el.setSelectionRange(selectionStart, selectionEnd);
                }
            }
        }
    }

    async _mount(container) {
        this.element = container;
        this._update();
        await this.onMount();
    }

    async onMount() {}
    async onDestroy() {}
    render() { return {}; }
}