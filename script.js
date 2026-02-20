function initInteractions() {
    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form submit
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for joining the waitlist! We\'ll be in touch soon.');
            form.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const partials = [
        { id: 'header-root', file: 'partials/header.html' },
        { id: 'hero-root', file: 'partials/hero.html' },
        { id: 'features-root', file: 'partials/features.html' },
        { id: 'how-root', file: 'partials/how-it-works.html' },
        { id: 'contact-root', file: 'partials/contact.html' },
        { id: 'cta-root', file: 'partials/cta.html' },
        { id: 'footer-root', file: 'partials/footer.html' }
    ];

    Promise.all(
        partials.map(part =>
            fetch(part.file)
                .then(response => response.text())
                .then(html => {
                    const container = document.getElementById(part.id);
                    if (container) {
                        container.innerHTML = html;
                    }
                })
        )
    )
        .then(() => {
            initInteractions();
        })
        .catch(err => {
            console.error('Error loading partials:', err);
        });
});
