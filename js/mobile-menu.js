// ===== GESTION DU MENU MOBILE =====

export function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    // Ouvrir le menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Fermer le menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Fermer au clic sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });
}
