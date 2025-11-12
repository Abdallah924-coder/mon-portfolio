// ===== NAVIGATION ET INTERACTIONS GÉNÉRALES =====

export function initNavigation() {
    // Smooth scroll pour tous les liens ancre
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

export function initNavbarShadow() {
    // Ajouter une ombre à la navbar au scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-xl');
        } else {
            nav.classList.remove('shadow-xl');
        }
    });
}

export function initScrollAnimation() {
    // Animation de fade-in au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in, section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}
