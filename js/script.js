document.addEventListener('DOMContentLoaded', () => {

    // DATA PER SEGMENT
    const segments = {
        citoyens: {
            title: "Citoyens Engagés",
            icon: "🌱",
            text: "Vos biodéchets ne sont pas des ordures, mais de l'or pour la terre. En triant, vous nourrissez la chaîne."
        },
        eleveurs: {
            title: "Éleveurs Ambitieux",
            icon: "🐂",
            text: "Transformez vos défis en ressources. La lombriculture est la clé d'une autosuffisance rentable."
        },
        politiques: {
            title: "Diplomates & Politiques",
            icon: "🏛️",
            text: "Un cadre souverain pour une nation résiliente. Soutenez l'innovation systémique pour le Burundi de 2026."
        },
        organisations: {
            title: "Organisations de Solutions",
            icon: "🤝",
            text: "L'impact réel passe par la coopération. Apportez vos moyens pour amplifier la boucle vertueuse."
        }
    };

    // DOM ELEMENTS
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const segmentDetail = document.getElementById('segment-detail');
    const detailContent = segmentDetail.querySelector('.detail-content');
    const closeBtn = segmentDetail.querySelector('.close-detail');

    // FUNCTIONS
    function openSegment(key) {
        const data = segments[key];
        if (!data) return;

        // Populate content
        detailContent.innerHTML = `
            <div class="detail-header">
                <span class="detail-icon">${data.icon}</span>
                <h3>${data.title}</h3>
            </div>
            <p class="detail-text">${data.text}</p>
            <a href="#engage" class="cta-button">Je m'engage</a>
        `;

        // Show panel
        segmentDetail.classList.remove('hidden');
        segmentDetail.classList.add('visible');

        // Optional: Scroll to it
        segmentDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeSegment() {
        segmentDetail.classList.remove('visible');
        setTimeout(() => {
            segmentDetail.classList.add('hidden');
        }, 300); // Wait for transition
    }

    // EVENTS
    mosaicItems.forEach(item => {
        item.addEventListener('click', () => {
            const segmentKey = item.getAttribute('data-segment');
            openSegment(segmentKey);
        });
    });

    // FORM HANDLING
    const form = document.getElementById('engagement-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call / Processing
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = "Signature en cours...";
            btn.disabled = true;

            setTimeout(() => {
                form.classList.add('hidden'); // Or remove it from DOM
                form.style.display = 'none';
                successMsg.classList.remove('hidden');

                // Log data for debugging (or future expansion)
                const formData = new FormData(form);
                console.log("Engagement:", Object.fromEntries(formData));
            }, 1000);
        });
    }

    closeBtn.addEventListener('click', closeSegment);
});
