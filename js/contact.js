/* ==========================================================================
   Contact — validation and direct email submission
   ========================================================================== */
(function () {
  const { qs } = CK;
  const form = qs('#contactForm');
  if (!form) return;

  const fields = {
    fullName: { el: qs('#fullName', form), rule: (v) => v.trim().length >= 2, msg: 'Please enter your full name.' },
    email: { el: qs('#email', form), rule: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
    phone: { el: qs('#phone', form), rule: (v) => v.trim().length >= 5, msg: 'Please enter a phone number.' },
    country: { el: qs('#country', form), rule: (v) => v.trim().length >= 2, msg: 'Please enter your country of residence.' },
    services: { el: qs('#services', form), rule: (v) => v.trim().length > 0, msg: 'Please choose an option.' },
    message: { el: qs('#message', form), rule: (v) => v.trim().length >= 10, msg: 'Message should be at least 10 characters.' }
  };

  const showError = (key, message) => {
    const errEl = qs(`[data-error-for="${key}"]`, form);
    if (errEl) errEl.textContent = message;
  };

  Object.entries(fields).forEach(([key, field]) => {
    if (field.el) {
      field.el.addEventListener('input', () => {
        if (field.rule(field.el.value)) showError(key, '');
      });
      field.el.addEventListener('change', () => {
        if (field.rule(field.el.value)) showError(key, '');
      });
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([key, field]) => {
      if (field.el) {
        const value = field.el.value;
        if (!field.rule(value)) {
          showError(key, field.msg);
          valid = false;
        } else {
          showError(key, '');
        }
      }
    });

    const statusEl = qs('.form-status', form);
    if (!valid) {
      if (statusEl) {
        statusEl.textContent = 'Please fix the highlighted fields.';
        statusEl.className = 'form-status error';
      }
      return;
    }

    const submitBtn = qs('button[type="submit"]', form);
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const formData = new FormData(form);
    formData.set('_subject', `New inquiry from ${formData.get('fullName') || 'website visitor'}`);
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');

    try {
      const response = await fetch('https://formsubmit.co/ajax/lemabarijoyful@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');

      if (statusEl) {
        statusEl.textContent = 'Thanks — your message has been received. I\'ll reply soon.';
        statusEl.className = 'form-status success';
      }
      form.reset();
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = 'Something went wrong while sending your message. Please email me directly at lemabarijoyful@gmail.com.';
        statusEl.className = 'form-status error';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
})();
