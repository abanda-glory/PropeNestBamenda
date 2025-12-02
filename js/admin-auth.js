// Admin Authentication Logic

// Check if already logged in on page load
window.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    // If on admin-login page and already logged in, redirect to panel
    if (currentPath.includes('admin-login.html')) {
        if (checkAdminLogin()) {
            window.location.href = 'admin-panel.html';
        }
    }
    
    // If on admin-panel page and not logged in, redirect to login
    if (currentPath.includes('admin-panel.html')) {
        if (!checkAdminLogin()) {
            window.location.href = 'admin-login.html';
        }
    }
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate credentials (simple front-end check)
    if (username === 'admin' && password === 'admin123') {
        // Store login status
        localStorage.setItem('adminLoggedIn', 'true');
        
        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberAdmin', 'true');
        }
        
        showNotification('Login successful! Redirecting...');
        
        // Redirect to admin panel after short delay
        setTimeout(() => {
            window.location.href = 'admin-panel.html';
        }, 1000);
    } else {
        showNotification('Invalid username or password');
        
        // Clear password field
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
        
        // Shake animation for login box
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.classList.add('shake');
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    }
}

// Add shake animation CSS
const shakeStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    .login-box.shake {
        animation: shake 0.5s;
    }
`;

if (!document.getElementById('shakeStyles')) {
    const shakeStyleSheet = document.createElement('style');
    shakeStyleSheet.id = 'shakeStyles';
    shakeStyleSheet.textContent = shakeStyles;
    document.head.appendChild(shakeStyleSheet);
}