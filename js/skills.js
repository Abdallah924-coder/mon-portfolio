// ===== GESTION DES COMPÉTENCES =====

export function initSkills() {
    // Intersection Observer pour les animations de compétences
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animer les compétences cachées
                const hiddenSkills = entry.target.querySelectorAll('.skill-hidden');
                hiddenSkills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.classList.remove('skill-hidden');
                        skill.classList.add('skill-visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer la section des compétences
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Fonction pour révéler manuellement une compétence
export function revealSkill(skillClass) {
    document.querySelectorAll(`.${skillClass}`).forEach(element => {
        element.classList.remove('skill-hidden');
        element.classList.add('skill-visible');
    });
}
