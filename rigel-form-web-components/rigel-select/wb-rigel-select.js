// ! Rigel Select Web Component
// ! Version: 1.1.0

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
            <div class="select--list"></div>
        </div>
        `;

        // Adiciona o CSS ao Shadow DOM
        this.shadowRoot.appendChild(cssLink);

        // Elementos do componente
        this.rigelSelectTrigger = this.shadowRoot.querySelector('.select--trigger');
        this.rigelSelectList = this.shadowRoot.querySelector('.select--list');
    }

    static get observedAttributes() {
        return ['placeholder', 'options'];
    }

    connectedCallback() {
        // Configurar event listeners
        this.rigelSelectTrigger.addEventListener('click', this.toggleList);
        document.addEventListener('click', this.handleClickOutside);

        // Configurar valor inicial
        const placeholder = this.getAttribute('placeholder') || 'Selecione uma opção';
        this.rigelSelectTrigger.textContent = placeholder;

        // Gerar opções iniciais
        this.renderOptions();
    }

    disconnectedCallback() {
        this.rigelSelectTrigger.removeEventListener('click', this.toggleList);
        document.removeEventListener('click', this.handleClickOutside);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder' && this.rigelSelectTrigger) {
            this.rigelSelectTrigger.textContent = newValue;
        } else if (name === 'options' && this.rigelSelectList) {
            this.renderOptions();
        }
    }

    // Métodos definidos como arrow functions
    toggleList = () => {
        this.rigelSelectList.classList.toggle('open');

        if (this.rigelSelectList.classList.contains('open')) {
            this.rigelSelectTrigger.classList.add('active');
        } else {
            this.rigelSelectTrigger.classList.remove('active');
        }
    };

    handleClickOutside = (event) => {
        if (!this.contains(event.target)) {
            this.rigelSelectList.classList.remove('open');
        }
    };

    handleOptionClick = (event) => {
        const option = event.target.closest('.select--option');
        if (option) {
            const value = option.getAttribute('data-value');
            const text = option.textContent;

            this.rigelSelectTrigger.textContent = text;
            this.setAttribute('value', value);
            this.rigelSelectList.classList.remove('open');
            this.rigelSelectTrigger.classList.remove('active');

            // Disparar evento de mudança
            const changeEvent = new CustomEvent('change', {
                detail: { value, text },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(changeEvent);
        }
    };

    renderOptions() {
        const optionsData = this.getAttribute('options');
        const options = optionsData ? JSON.parse(optionsData) : [];

        // Limpa a lista antes de renderizar
        this.rigelSelectList.innerHTML = '';

        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('select--option');
            optionElement.setAttribute('data-value', option.value);
            optionElement.textContent = option.label;
            optionElement.addEventListener('click', this.handleOptionClick);
            this.rigelSelectList.appendChild(optionElement);
        });
    }
}

// Registrar o componente
customElements.define('rigelwbc-select', RigelSelect);
