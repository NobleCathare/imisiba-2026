document.addEventListener('DOMContentLoaded', () => {

    // DATA PER SEGMENT
    const segments = {
        citoyens: {
            title: "Citoyens Engagés",
            icon: "🌱", // Icon kept in data but not displayed in header as per request
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

    // MAPPING SEGMENT -> OPTION VALUE
    const engagementMap = {
        citoyens: "Trier",
        eleveurs: "Transformer",
        politiques: "Soutenir",
        organisations: "Investir"
    };

    // DOM ELEMENTS
    const mosaicItems = document.querySelectorAll('.mosaic-item');
    const segmentDetail = document.getElementById('segment-detail');
    const detailContent = segmentDetail.querySelector('.detail-content');
    const closeBtn = segmentDetail.querySelector('.close-detail');
    const commitmentSelect = document.getElementById('commitment');

    // FUNCTIONS
    function openSegment(key) {
        const data = segments[key];
        if (!data) return;

        // Populate content - ICON REMOVED from display
        detailContent.innerHTML = `
            <div class="detail-header">
                <h3>${data.title}</h3>
            </div>
            <p class="detail-text">${data.text}</p>
            <a href="#engage" class="cta-button">Je m'engage</a>
        `;

        // Add Click Listener for Pre-fill
        const ctaBtn = detailContent.querySelector('.cta-button');
        ctaBtn.addEventListener('click', (e) => {
            const val = engagementMap[key];
            if (val && commitmentSelect) {
                commitmentSelect.value = val;
                // Highlight visual effect
                commitmentSelect.style.transition = "all 0.3s";
                commitmentSelect.style.borderColor = 'var(--color-gold)';
                commitmentSelect.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
                setTimeout(() => {
                    commitmentSelect.style.borderColor = '#ccc';
                    commitmentSelect.style.backgroundColor = '#fdfdfd';
                }, 1000);
            }
        });

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

            btn.textContent = "Signature en cours...";
            btn.disabled = true;

            // Google Apps Script Web App URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbz7x5XnJOx2luI-2ofVSBbHvvlcyQnDRUDCAMrhrSFLy57z5uDHo4VbjbRjUSjTo5gQ/exec';

            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            })
                .then(response => {
                    // Determine success based on response
                    form.style.display = 'none';
                    successMsg.classList.remove('hidden');
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    console.log('Success!', response);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    btn.textContent = "Je signe mon engagement"; // Reset text
                    btn.disabled = false;
                    alert("Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion.");
                });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSegment);
    }
});
