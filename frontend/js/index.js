// DOM Elements
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Initialize the auth page
function init() {
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const targetForm = document.getElementById(tab.dataset.target);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.parentElement.querySelector('input');
            const icon = button.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Login form check
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        if (!email || !password) {
            alert('Please enter your email and password.');
            return;
        }
        else {
            try {
                const response = await fetch('http://localhost:5000/api/login/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
        
                const data = await response.json();
        
                if (data.success) {
                    window.location.href = '/home';
                    console.log('Login successful:', data);
                } else {
                    alert('Invalid email or password. Please try again.');
                    console.log('Login failed:', data.message);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
                console.log('Error:', error);
            }
        }   
    });
    
    // Register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        // Validate form
        if (!name || !email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin đăng ký.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }
        
        if (!agreeTerms) {
            alert('Bạn cần đồng ý với điều khoản sử dụng để tiếp tục.');
            return;
        }
        
        // Simulate registration (would connect to backend in a real app)
        console.log('Registration data:', { name, email, password });
        
        // Redirect to home page after successful registration
        alert('Đăng ký thành công!');
        window.location.href = 'index.html';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

fetch ("http://" + hostname + port +"/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: username,
        email: email,
        password: password,
    })
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok');
    }
})
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});