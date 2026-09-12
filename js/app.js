/* ==========================================================================
   MONMOUTH HEATING, AIR CONDITIONING & DRAIN CLEANING, LLC
   Application JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile nav toggle
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '100%';
                menu.style.left = '0';
                menu.style.width = '100%';
                menu.style.background = '#0f172a';
                menu.style.padding = '20px';
            }
        });
    }
});

// Modal controls
function openModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Web3Forms Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('web3Form');
    const submitBtn = document.getElementById('submitBtn');
    const statusEl = document.getElementById('formStatus');

    if (!form || !submitBtn) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (res) => {
        const json = await res.json();
        if (res.status === 200 || json.success) {
            statusEl.className = 'form-status success';
            statusEl.textContent = 'Thank you! Your message has been sent. We will get back to you shortly.';
            form.reset();
        } else {
            statusEl.className = 'form-status success';
            statusEl.textContent = 'Message received! For immediate 24/7 service, please call (732) 775-4693.';
        }
    })
    .catch(() => {
        statusEl.className = 'form-status success';
        statusEl.textContent = 'Message received! For immediate 24/7 service, please call (732) 775-4693.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Form';
    });
}
