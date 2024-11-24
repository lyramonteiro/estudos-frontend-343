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
        <div class="rigelwbc-select">
            <div class="select--trigger" part="trigger"></div>
            <div class="select--list">
                <slot></slot>
            </div>
        </div>
        `;

        // Elementos do componente
        this.rigelSelectTrigger = this.shadowRoot.querySelector('.select--trigger');
        this.rigelSelectList = this.shadowRoot.querySelector('.select--list');
    }

    static get observedAttributes() {
        return ['placeholder'];
    }

    connectedCallback() {
        // Configurar event listeners
        this.rigelSelectTrigger.addEventListener('click', this.toggleList);
        this.addEventListener('click', this.handleOptionClick);
        document.addEventListener('click', this.handleClickOutside);

        // Configurar valor inicial
        const placeholder = this.getAttribute('placeholder') || 'Selecione uma opção';
        this.rigelSelectTrigger.textContent = placeholder;

        // Processar options iniciais
        this.processSlottedElements();
    }

    disconnectedCallback() {
        this.rigelSelectTrigger.removeEventListener('click', this.toggleList);
        this.removeEventListener('click', this.handleOptionClick);
        document.removeEventListener('click', this.handleClickOutside);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder' && this.rigelSelectTrigger) {
            this.rigelSelectTrigger.textContent = newValue;
        }
    }

    // Métodos definidos como arrow functions
    toggleList = () => {
        this.rigelSelectList.classList.toggle('open');
    };

    handleOptionClick = (event) => {
        const option = event.target.closest('.select--option');
        if (option) {
            const value = option.getAttribute('data-value');
            const text = option.textContent;

            this.rigelSelectTrigger.textContent = text;
            this.setAttribute('value', value);
            this.rigelSelectList.classList.remove('active');

            // Disparar evento de mudança
            const changeEvent = new CustomEvent('change', {
                detail: { value, text },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(changeEvent);
        }
    };

    handleClickOutside(event) {
        if (!this.contains(event.target)) {
            this.rigelSelectList.classList.remove('active');
        }
    }

    processSlottedElements() {
        const slot = this.shadowRoot.querySelector('slot');
        const elements = slot.assignedElements();

        elements.forEach(element => {
            if (!element.classList.contains('select--option')) {
                element.classList.add('select--option');
            }
        });
    }

}

// Registrar o componente
customElements.define('rigelwbc-select', RigelSelect);
