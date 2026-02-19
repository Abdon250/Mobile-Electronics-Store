export function initSignup() {
    const form = document.getElementById('signup-form');
    const msg = document.getElementById('signup-message');

    if (!form) return;

    const fields = {
        name: document.getElementById('signup-name'),
        email: document.getElementById('signup-email'),
        password: document.getElementById('signup-password'),
        confirm: document.getElementById('signup-confirm')
    };

    const errors = {
        name: document.getElementById('error-name'),
        email: document.getElementById('error-email'),
        password: document.getElementById('error-password'),
        confirm: document.getElementById('error-confirm')
    };

    // Real-time validation
    fields.name.addEventListener('input', () => {
        errors.name.textContent = fields.name.value.trim() ? '' : 'Name is required';
    });

    fields.email.addEventListener('input', () => {
        if (!fields.email.value.trim()) {
            errors.email.textContent = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(fields.email.value)) {
            errors.email.textContent = 'Invalid email format';
        } else {
            errors.email.textContent = '';
        }
    });

    fields.password.addEventListener('input', () => {
        if (!fields.password.value.trim()) {
            errors.password.textContent = 'Password is required';
        } else if (fields.password.value.length < 6) {
            errors.password.textContent = 'Password must be at least 6 characters';
        } else {
            errors.password.textContent = '';
        }
    });

    fields.confirm.addEventListener('input', () => {
        if (!fields.confirm.value.trim()) {
            errors.confirm.textContent = 'Confirm password is required';
        } else if (fields.confirm.value !== fields.password.value) {
            errors.confirm.textContent = 'Passwords do not match';
        } else {
            errors.confirm.textContent = '';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.textContent = '';
        let hasError = false;

        // Trigger all validations
        Object.keys(fields).forEach(key => fields[key].dispatchEvent(new Event('input')));
        Object.values(errors).forEach(err => {
            if (err.textContent) hasError = true;
        });

        if (hasError) return;

        // Simulate signup success
        console.log('Signup successful:', {
            name: fields.name.value,
            email: fields.email.value,
            password: fields.password.value
        });

        msg.textContent = '✅ Signup successful!';
        form.reset();
        Object.values(errors).forEach(err => err.textContent = '');
    });
}
