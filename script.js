// Auxano Website Animation Script
// Animates all major sections and elements on scroll

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element enters view: Add the class to trigger animation
                entry.target.classList.add('in-view');
            } else {
                // Element leaves view: Remove the class so it can animate again
                entry.target.classList.remove('in-view');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Optional: trigger slightly before it hits the bottom
    });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

function addAnimationClasses() {
    // 1. Add .animate to all major elements
    const selectors = [
        'h1', 'h2', 'h3', 'p', 'section', '.feature-row', '.step', 
        '.contact-form', '.cta-banner', '.footer-col', '.hero-image img'
    ];
    
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('animate');
        });
    });

    // 2. Animate nav links ONLY (excluding the logo link)
    // This targets <a> tags inside <li>, leaving the logo <a> alone
    document.querySelectorAll('.nav-links a').forEach(el => {
        el.classList.add('animate');
    });

    // 3. Animate images EXCEPT those inside the logo
    document.querySelectorAll('img').forEach(img => {
        if (!img.closest('.logo')) {
            img.classList.add('animate');
        }
    });

    // 4. Feature rows: slide direction
    document.querySelectorAll('.feature-row').forEach(row => {
        row.classList.add(row.classList.contains('reverse') ? 'slide-right' : 'slide-left');
    });
}

function animateHeaderImmediately() {
    // Only animate the links in the list, not the whole nav or logo
    document.querySelectorAll('.nav-links a').forEach(el => {
        setTimeout(() => el.classList.add('in-view'), 100);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
    animateHeaderImmediately();
    animateOnScroll();

    // Calendly modal integration
    const calendlyModal = document.getElementById('calendly-modal');
    const calendlyClose = document.getElementById('calendly-close');
    let calendlyLoaded = false;
    function showCalendlyModal(e) {
        e.preventDefault();
        calendlyModal.style.display = 'flex';
        if (!calendlyLoaded && window.Calendly) {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/it-interns-dgpcpa/30min',
                parentElement: document.getElementById('calendly-inline-widget'),
                prefill: {}, utm: {}
            });
            calendlyLoaded = true;
        }
    }
        // Book a Demo button: go to booking page in same tab
        document.querySelectorAll('a.btn-nav, a.btn-hero-demo, a.btn.btn-outline-dark').forEach(btn => {
            if (btn.textContent.trim().toLowerCase().includes('book a demo')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'calendly-book-demo.html';
                });
            }
        });
    // Close modal on X click or background click
    if (calendlyClose && calendlyModal) {
        calendlyClose.addEventListener('click', () => {
            calendlyModal.style.display = 'none';
        });
        calendlyModal.addEventListener('click', (e) => {
            if (e.target === calendlyModal) calendlyModal.style.display = 'none';
        });
    }
});
