// ! Rigel Select Web Component
// ! Version: 1.0.0

class RigelSelect extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        // CSS
        const cssLink = document.createElement('link');
        cssLink.setAttribute('rel', 'stylesheet');
        cssLink.setAttribute('href', 'wb-rigel-select.css');

        // Template
        this.shadowRoot.innerHTML = `
        <div class="rigel__select">
            <div class="select--trigger" part="trigger"></div>
            <div class="select--list">
                <slot></slot>
            </div>
        </div>
        `;
    }
};
