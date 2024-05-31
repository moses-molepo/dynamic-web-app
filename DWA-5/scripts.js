/* eslint-disable linebreak-style */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-form]');
  const result = document.querySelector('[data-result]');
  const errorMessage = document.createElement('h1');
  document.body.appendChild(errorMessage);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Validate inputs
    if (dividend === '' || divider === '') {
      result.innerText = 'Division not performed. Both values are required in inputs. Try again';
      return;
    }

    if (isNaN(dividend) || isNaN(divider)) {
      errorMessage.innerText = 'Something critical went wrong. Please reload the page';
      form.style.display = 'none';
      result.style.display = 'none';
      const error = new Error('Invalid inputs: Both inputs must be valid numbers');
      console.error(error);
      console.error(error.stack);
      return;
    }

    const numDividend = parseFloat(dividend);
    const numDivider = parseFloat(divider);

    // Validate numbers
    if (numDivider <= 0) {
      result.innerText = 'Division not performed. Invalid number provided. Try again';
      return;
    }

    const resultValue = numDividend / numDivider;

    // Display result
    if (Number.isInteger(resultValue)) {
      result.innerText = resultValue;
    } else {
      result.innerText = Math.round(resultValue);
    }
  });
});
