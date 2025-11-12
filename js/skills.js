// ===== GESTION DES COMPÉTENCES =====

export function initSkills() {
    // Révéler immédiatement tous les éléments skill-hidden si IntersectionObserver n'est pas nécessaire
    // ou ajouter une classe pour les rendre visibles au chargement
    const revealAllSkills = () => {
        document.querySelectorAll('.skill-hidden').forEach((skill, index) => {
            setTimeout(() => {
                skill.classList.remove('skill-hidden');
                skill.classList.add('skill-visible');
            }, index * 100);
        });
    };

    // Intersection Observer pour les animations de compétences au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animer les compétences cachées
                const hiddenSkills = entry.target.querySelectorAll('.skill-hidden');
                if (hiddenSkills.length > 0) {
                    hiddenSkills.forEach((skill, index) => {
                        setTimeout(() => {
                            skill.classList.remove('skill-hidden');
                            skill.classList.add('skill-visible');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer la section des compétences
    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        observer.observe(skillsSection);
    } else {
        // Si la section n'existe pas, révéler tous les skills quand même
        revealAllSkills();
    }

    // Fallback: si on arrive à la fin du chargement et les skills sont toujours cachés, les révéler
    window.addEventListener('load', () => {
        setTimeout(() => {
            const stillHidden = document.querySelectorAll('.skill-hidden');
            if (stillHidden.length > 0) {
                console.warn('Skills still hidden after load, revealing now');
                revealAllSkills();
            }
        }, 1000);
    });
}

// Fonction pour révéler manuellement une compétence
export function revealSkill(skillClass) {
    document.querySelectorAll(`.${skillClass}`).forEach(element => {
        element.classList.remove('skill-hidden');
        element.classList.add('skill-visible');
    });
}
