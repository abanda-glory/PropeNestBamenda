// Contact Form Handling and Validation

// Email validation (enhanced)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation (Cameroon format)
function validatePhone(phone) {
    // Remove spaces and check for Cameroon phone format
    const cleanPhone = phone.replace(/\s/g, '');
    const re = /^(\+237)?[26]\d{8}$/;
    return re.test(cleanPhone);
}

// Validate name (at least 2 characters, letters and spaces only)
function validateName(name) {
    const re = /^[a-zA-Z\s]{2,}$/;
    return re.test(name.trim());
}

// Validate message (at least 10 characters)
function validateMessage(message) {
    return message.trim().length >= 10;
}

// Real-time validation for form fields
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add real-time validation
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const messageInput = document.getElementById('contactMessage');
        
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateField(this, validateName(this.value), 'Please enter a valid name (at least 2 characters)');
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateField(this, validateEmail(this.value), 'Please enter a valid email address');
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                validateField(this, validatePhone(this.value), 'Please enter a valid Cameroon phone number');
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                validateField(this, validateMessage(this.value), 'Message must be at least 10 characters');
            });
        }
    }
});

// Validate individual field and show feedback
function validateField(input, isValid, errorMessage) {
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error class
    input.classList.remove('error');
    
    if (!isValid && input.value.trim() !== '') {
        input.classList.add('error');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        input.parentElement.appendChild(errorDiv);
    }
}

// Add CSS for error states dynamically
const errorStyles = `
    .error {
        border-color: var(--accent-color) !important;
    }
    
    .error-message {
        color: var(--accent-color);
        font-size: 0.85rem;
        margin-top: 0.25rem;
    }
    
    .success-message {
        background-color: var(--success-color);
        color: white;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        text-align: center;
    }
`;

// Add error styles to document if not already present
if (!document.getElementById('contactFormStyles')) {
    const formStyleSheet = document.createElement('style');
    formStyleSheet.id = 'contactFormStyles';
    formStyleSheet.textContent = errorStyles;
    document.head.appendChild(formStyleSheet);
}

// Format phone number as user types (Cameroon format)
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    // Handle +237 prefix
    if (value.startsWith('237')) {
        value = value.substring(3);
    }
    
    // Format as: 6XX XXX XXX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + ' ' + value.slice(3);
        } else {
            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 9);
        }
    }
    
    input.value = value;
}

// Auto-format phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});