// ===== INTERACTIONS GÉNÉRALES =====

export function initFormHandler() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]')?.value || form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[name="email"]')?.value || form.querySelector('input[type="email"]').value;
        const subject = form.querySelector('input[name="subject"]')?.value || form.querySelectorAll('input[type="text"]')[1]?.value;
        const message = form.querySelector('textarea[name="message"]')?.value || form.querySelector('textarea').value;

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

        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = '⏳ Envoi en cours...';
        button.disabled = true;

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            const json = await res.json();
            if (res.ok && json.ok) {
                button.textContent = '✅ Message envoyé!';
                setTimeout(() => {
                    form.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                }, 2500);
            } else {
                throw new Error(json.error || 'Erreur lors de l\'envoi');
            }
        } catch (err) {
            console.error('Contact send error:', err);
            alert('Erreur lors de l\'envoi du message. Réessaie plus tard.');
            button.textContent = originalText;
            button.disabled = false;
        }
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
