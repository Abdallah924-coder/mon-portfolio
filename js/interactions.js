// ===== INTERACTIONS GÉNÉRALES =====

export function initFormHandler() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[1]?.value;
        const message = form.querySelector('textarea').value;

        // Validation simple
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide!');
            return;
        }

        // Message de succès
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = '✅ Message envoyé!';
        button.disabled = true;

        // Réinitialiser après 3 secondes
        setTimeout(() => {
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);

        // Ici vous pouvez ajouter une intégration avec un service email
        console.log({ name, email, subject, message });
    });
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
