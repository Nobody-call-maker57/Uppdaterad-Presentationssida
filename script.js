document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeToggle();
    initAccordion();
    initContactForm();
});

function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
    });
}

function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️ Ljust tema';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeBtn.textContent = '🌙 Mörkt tema';
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '☀️ Ljust tema' : '🌙 Mörkt tema';
  });
}

function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      if (!panel) return;

triggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.hidden = true;
        }
      });

    trigger.setAttribute('aria-expanded', !isExpanded);
      panel.hidden = isExpanded;
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const statusBox = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Vänligen ange ditt namn.');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showError(emailInput, 'Vänligen ange en giltig e-postadress.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Vänligen skriv ett meddelande.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      statusBox.className = 'form-status success';
      statusBox.setAttribute('role', 'status');
      statusBox.textContent = 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.';
      form.reset();
    }
  });
}

function showError(input, text) {
  input.setAttribute('aria-invalid', 'true');
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = text;
  }
}

function clearError(input) {
  input.setAttribute('aria-invalid', 'false');
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
