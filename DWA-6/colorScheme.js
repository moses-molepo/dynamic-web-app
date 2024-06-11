/* eslint-disable linebreak-style */

export function setPreferredColorScheme() {
  const isDarkModePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkModePreferred) {
    document.querySelector('[data-settings-theme]').value = 'night';
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.querySelector('[data-settings-theme]').value = 'day';
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
}

export function attachColorSchemeChangeListener() {
  // Define the change listener
  const colorSchemeChangeListener = (event) => {
    event.preventDefault();
    setPreferredColorScheme(); // Call the function when the color scheme changes
  };

  // Attach the listener to the event
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', colorSchemeChangeListener);
}

// Call the function initially to set the color scheme
setPreferredColorScheme();

export function setThemeFromSelect(selectElement) {
  const selectedValue = selectElement.value;
  if (selectedValue === 'day') {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  } else if (selectedValue === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  }
}
