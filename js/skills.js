// ===== GESTION DES COMPÉTENCES =====

export function initSkills() {
    // Les compétences en apprentissage restent cachées (floues)
    // Aucune révélation automatique
    console.log('Skills initialized — future skills remain hidden');
}

// Fonction pour révéler manuellement une compétence (si besoin)
export function revealSkill(skillClass) {
    document.querySelectorAll(`.${skillClass}`).forEach(element => {
        element.classList.remove('skill-hidden');
        element.classList.add('skill-visible');
    });
}
