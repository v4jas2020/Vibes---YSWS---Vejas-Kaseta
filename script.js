// SETTINGS: Change the default theme here ("light" or "dark").
const DEFAULT_THEME = 'light';
const THEME_STORAGE_KEY = 'snapshot-theme';

// THEME TOGGLE
const themeButton = document.querySelector('.theme-toggle');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === 'dark';
  themeButton.textContent = isDark ? '?' : '?';
  themeButton.setAttribute(
    'aria-label',
    `Switch to ${isDark ? 'light' : 'dark'} mode`
  );
}

// Restore a visitor's choice, or start with the default theme.
let initialTheme = DEFAULT_THEME;

try {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    initialTheme = savedTheme;
  }
} catch {
  // The theme still works when browser storage is unavailable.
}

setTheme(initialTheme);

themeButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // Saving a preference is optional.
  }
});

// MOBILE NAVIGATION
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';

  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const desktopScreen = window.matchMedia('(min-width: 701px)');

desktopScreen.addEventListener('change', (event) => {
  if (event.matches) {
    closeMenu();
  }
});

// SCROLL ANIMATIONS
// Add class="reveal" to a new section to give it the same fade-in effect.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.reveal').forEach((section) => {
    observer.observe(section);
  });

  document.body.classList.add('js-ready');
}

// FOOTER: Keep the copyright year up to date automatically.
document.querySelector('#year').textContent = new Date().getFullYear();
