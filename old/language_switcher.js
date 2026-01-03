// language-switcher.js
let translations = {};
const flagMapping = {
    'en': 'gb',
    'de': 'de'
};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        translations[lang] = await response.json();
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
    }
}

async function initializeLanguageSwitcher() {
    // Load all translations first
    await Promise.all([
        loadTranslations('en'),
        loadTranslations('de')
    ]);

    let currentLang = localStorage.getItem('language') || 'en';

    function updateContent(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        const currentFlag = document.getElementById('currentFlag');
        currentFlag.className = `fi fi-${flagMapping[lang]}`;

        localStorage.setItem('language', lang);
    }

    document.querySelectorAll('[data-language]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.closest('[data-language]').getAttribute('data-language');
            updateContent(lang);
        });
    });

    updateContent(currentLang);
}

document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);
