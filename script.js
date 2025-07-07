document.addEventListener('DOMContentLoaded', () => {
    console.log('XeyLabs website loaded');

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
        });
    }

    // Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        }
    }

    // Check for saved theme preference or use system preference
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // Smooth scroll for anchor links (if any) - this is from the original script, kept for docs page
    // Ensure this doesn't conflict with docs-specific scroll spy if that's more complex.
    // For basic anchor scrolling, this is fine.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            // Check if it's a doc page internal link, otherwise let default behavior for other pages.
            // This is a basic check; more robust routing/handling might be needed for complex SPAs.
            if (document.body.classList.contains('docs-page-body')) { // Assuming you add this class to docs.html body
                 e.preventDefault();
                 const targetElement = document.querySelector(targetHref);
                 if(targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                 }
            } else if (targetHref.startsWith("#") && targetHref.length > 1) { // Standard internal anchor
                 e.preventDefault();
                 const targetElement = document.querySelector(targetHref);
                 if(targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                 }
            }
        });
    });
});
