// ===== POINT D'ENTRÉE PRINCIPAL =====
// Ce fichier initialise tous les modules

import { initMobileMenu } from './mobile-menu.js';
import { initSkills } from './skills.js';
import { initNavigation, initNavbarShadow, initScrollAnimation } from './main.js';
import { initFormHandler, initButtonAnimations, initProjectCards } from './interactions.js';

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du portfolio...');

    // Initialiser tous les modules
    initMobileMenu();
    console.log('✅ Menu mobile initialisé');

    initNavigation();
    console.log('✅ Navigation lisse initialisée');

    initNavbarShadow();
    console.log('✅ Ombre navbar initialisée');

    initScrollAnimation();
    console.log('✅ Animations scroll initialisées');

    initSkills();
    console.log('✅ Animations compétences initialisées');

    initFormHandler();
    console.log('✅ Formulaire de contact initialisé');

    initButtonAnimations();
    console.log('✅ Animations boutons initialisées');

    initProjectCards();
    console.log('✅ Cartes projets initialisées');

    console.log('🎉 Portfolio entièrement initialisé!');
});
