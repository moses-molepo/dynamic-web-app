/* eslint-disable linebreak-style */
import {
  html, render, LitElement, css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class TallyCounterApp extends LitElement {
  static properties = {
    MAX_NUMBER: { type: Number },
    MIN_NUMBER: { type: Number },
    STEP_AMOUNT: { type: Number },
  };

  constructor() {
    super();
    this.MAX_NUMBER = 10;
    this.MIN_NUMBER = -10;
    this.STEP_AMOUNT = 1;
  }

  render() {
    return html`
      <aside class="controls">
        <button data-key="reset" class='restart'>reset</button>
      </aside>

      <main class="counter">
        <input class="counter__value" data-key="number" readonly value="0">
        <div class="counter__actions">
          <button data-key="add" class="counter__button counter__button_first">add</button>
          <button data-key="subtract" class="counter__button counter__button">subtract</button>
        </div>
      </main>
    `;
  }

  // Add this method to handle the color update
  updateColor() {
    const numberInput = this.shadowRoot.querySelector('input[data-key="number"]');
    const value = parseInt(numberInput.value, 10);
    const singleStep = 250 / (this.MAX_NUMBER - this.MIN_NUMBER);
    const distMax = this.MAX_NUMBER - value;
    const distMin = value - this.MIN_NUMBER;
    const maxValue = distMax * singleStep;
    const minValue = distMin * singleStep;

    if (value >= this.STEP_AMOUNT) {
      numberInput.style.color = `rgb(${maxValue},${minValue},10)`;
    } else if (value <= this.STEP_AMOUNT) {
      numberInput.style.color = `rgb(${maxValue},${minValue},10)`;
    }

    if (value === 0) {
      numberInput.style.color = 'white';
      console.log('Normal');
    }
  }

  // Add event listeners for the buttons
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    const addButton = this.shadowRoot.querySelector('button[data-key="add"]');
    const subtractButton = this.shadowRoot.querySelector('button[data-key="subtract"]');
    const resetButton = this.shadowRoot.querySelector('button[data-key="reset"]');

    addButton.addEventListener('click', () => {
      const numberInput = this.shadowRoot.querySelector('input[data-key="number"]');
      const newValue = parseInt(numberInput.value, 10) + this.STEP_AMOUNT;
      numberInput.value = newValue;

      if (subtractButton.disabled === true) {
        subtractButton.disabled = false;
      }

      if (newValue >= this.MAX_NUMBER) {
        addButton.disabled = true;
        console.log('Maximum number reached.');
      }

      this.updateColor();
    });

    subtractButton.addEventListener('click', () => {
      const numberInput = this.shadowRoot.querySelector('input[data-key="number"]');
      const newValue = parseInt(numberInput.value, 10) - this.STEP_AMOUNT;
      numberInput.value = newValue;

      if (addButton.disabled === true) {
        addButton.disabled = false;
      }

      if (newValue <= this.MIN_NUMBER) {
        subtractButton.disabled = true;
        console.log('Minimum number reached.');
      }

      this.updateColor();
    });

    resetButton.addEventListener('click', () => {
      const numberInput = this.shadowRoot.querySelector('input[data-key="number"]');
      numberInput.value = '0';
      numberInput.style.color = '';
      alert('Counter successfully reset');
    });
  }

  static styles = css`
  :root {
    --color-white:#ffffff;
    --color-darkgray:#33333d;
    --color-mediumgray:#464661;
    --color-lightgray:#d2d6dc;

}


* {
    box-sizing: border-box;
}

/* Styles for small screens (e.g., smartphones) */
@media (max-width: 767px) {
    body {
      font-size: 14px;
    }
  
    .container {
      width: 90%;
    }
  }
  
  /* Styles for medium screens (e.g., tablets) */
  @media (min-width: 768px) and (max-width: 991px) {
    body {
      font-size: 16px;
    }
  
    .container {
      width: 80%;
    }
  }
  
  /* Styles for large screens (e.g., desktops) */
  @media (min-width: 992px) {
    body {
      font-size: 18px;
    }
  
    .container {
      width: 70%;
    }
  }
  

html {
    height: 100vh;
}

body {
    

    font-family: Roboto, Arial, Helvetica, sans-serif; 
    display: flex
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.header{
    text-align: center;
}

h1 {
    font-size: 3rem;
    font-weight: 900;
}

.restart {
    background: none;
    justify-content: center;
    width: 100%;
    border-width: 200;
    padding: 0;
    font-size: 3rem;
    height: 10rem;
    border-bottom: 20px solid var(--color-lightgray);
    align-self: center;
}
.restart:active {
    
    transform: translateY(2%);
    transition: transform 0.2s;
}




.counter__value {
    width: 100%;
    height: 15rem;
    text-align: center;
    font-size: 5rem;
    font-weight: 1000;
    border-width: 0;
    border-bottom: 1px solid var(--color-lightgray);
    color: var(--color-white);
    background: none;
}

.counter__actions {
    display: flex;
}

.counter__button {
    background: none;
    width: 50%;
    border-width: 200;
  
    font-size: 3rem;
    height: 10rem;
    border-bottom: 20px solid var(--color-lightgray);
    transition: transform 0.2s;
}

.counter__button:active {
    background-color: #6a6a76;
    transform: translateY(2%);
}
.counter__button:disabled{
    opacity: 0.2;
}

.counter__button_first{
    border-right: 1px solid var(--color-lightgray);
}

footer {
    padding: 0.5rem;
}

.footer__link {
    color: #ffffff;
}


  `;
}

customElements.define('tally-counter-app', TallyCounterApp);
const app = document.querySelector('#app');
render(html`<tally-counter-app></tally-counter-app>`, app);
