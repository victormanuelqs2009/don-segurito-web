/* ================================================
   MEJORAS PREMIUM - JAVASCRIPT ANIMATIONS
   ================================================
   
   Agregar este código AL INICIO del main.js existente
   ================================================ */

// Scroll Reveal System
(function () {
    'use strict';

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Add animation classes to benefit cards
        const benefitCards = document.querySelectorAll('.benefit');
        benefitCards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Add animation to stats
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            stat.classList.add('scale-in');
            stat.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(stat);
        });

        // Add animation to section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('fade-in-up');
            observer.observe(header);
        });

        console.log('✨ Premium animations initialized');

        /* ================================================
           CONTACT FORM HANDLING
           ================================================ */
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Get values
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const service = document.getElementById('service').value;
                const message = document.getElementById('message').value;

                // Construct WhatsApp Message
                const text = `*Hola Don Segurito!* 👋%0A%0AMe interesa cotizar un servicio:%0A%0A👤 *Nombre:* ${name}%0A📱 *Teléfono:* ${phone}%0A🛠️ *Servicio:* ${service}%0A💬 *Mensaje:* ${message}`;

                // Show success animation
                const formContent = contactForm.innerHTML;
                contactForm.innerHTML = `
                    <div class="form-success visible">
                        <span class="success-icon">✅</span>
                        <h3>¡Mensaje Listo!</h3>
                        <p>Te estamos redirigiendo a WhatsApp para completar tu solicitud...</p>
                    </div>
                `;

                // Redirect after short delay
                setTimeout(() => {
                    window.open(`https://wa.me/573226145318?text=${text}`, '_blank');

                    // Reset form (optional, restoring content)
                    setTimeout(() => {
                        contactForm.innerHTML = formContent;
                        contactForm.reset();
                        // Re-attach listener would be needed here technically, 
                        // but usually user leaves page or we just leave the success message.
                        location.reload();
                    }, 3000);
                }, 1500);
            });
        }
    }
})();
