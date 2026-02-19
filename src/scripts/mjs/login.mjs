export function initLogin() {
    const form = document.getElementById('login-form');
    const msg = document.getElementById('login-message');

    if (!form) return;

    const fields = {
        email: document.getElementById('login-email'),
        password: document.getElementById('login-password')
    };

    const errors = {
        email: document.getElementById('login-error-email'),
        password: document.getElementById('login-error-password')
    };

    // Real-time validation
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        msg.textContent = '';
        let hasError = false;

        // Trigger input events to validate fields
        Object.keys(fields).forEach(key => fields[key].dispatchEvent(new Event('input')));
        Object.values(errors).forEach(err => {
            if (err.textContent) hasError = true;
        });

        if (hasError) return;

        // Simulate login success
        console.log('Login successful:', {
            email: fields.email.value,
            password: fields.password.value
        });

        msg.textContent = '✅ Login successful!';
        form.reset();
        Object.values(errors).forEach(err => err.textContent = '');
    });
}
