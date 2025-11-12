// ===== INTERACTIONS GÉNÉRALES =====

export function initFormHandler() {
    // FormSubmit.co handles form submission and validation automatically
    // No additional handler needed — form submits natively to FormSubmit endpoint
}

export function initButtonAnimations() {
    // Animations des boutons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('md:hidden')) {
                this.style.transform = 'scale(1.05)';
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

export function initProjectCards() {
    // Animations des cartes de projets
    const projectCards = document.querySelectorAll('.group');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
