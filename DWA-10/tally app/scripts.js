/* eslint-disable linebreak-style */
const MAX_NUMBER = 10;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 1;

const elements = {
  number: document.querySelector('[data-key="number"]'),
  add: document.querySelector('[data-key="add"]'),
  subtract: document.querySelector('[data-key="subtract"]'),
  reset: document.querySelector('[data-key="reset"]'),
};

const updateColor = () => {
  const value = parseInt(elements.number.value, 10);
  const singleStep = 250 / (MAX_NUMBER - MIN_NUMBER);
  const distMax = MAX_NUMBER - value;
  const distMin = value - MIN_NUMBER;
  const maxValue = distMax * singleStep;
  const minValue = distMin * singleStep;

  if (value >= STEP_AMOUNT) {
    elements.number.style.color = `rgb(${maxValue},${minValue},10)`;
  } else if (value <= STEP_AMOUNT) {
    elements.number.style.color = `rgb(${maxValue},${minValue},10)`;
  }

  if (value === 0) {
    elements.number.style.color = 'black';
  }
};

const addHandler = () => {
  const newValue = parseInt(elements.number.value, 10) + STEP_AMOUNT;

  elements.number.value = newValue;

  if (elements.subtract.disabled === true) {
    elements.subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    elements.add.disabled = true;
  }

  updateColor();
};

const subtractHandler = () => {
  const newValue = parseInt(elements.number.value, 10) - STEP_AMOUNT;

  elements.number.value = newValue;

  if (elements.add.disabled === true) {
    elements.add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    elements.subtract.disabled = true;
  }

  updateColor();
};

function resetCounterValue() {
  const inputElement = document.querySelector('.counter__value');
  if (inputElement) {
    inputElement.value = '0';
    inputElement.style.color = '';
  } else {
    console.error("Element with class 'counter__value' not found.");
  }
  alert('counter successfully reset');
}

elements.reset.addEventListener('click', resetCounterValue);
elements.add.addEventListener('click', addHandler);
elements.subtract.addEventListener('click', subtractHandler);
