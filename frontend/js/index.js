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
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate form
        if (!email || !password) {
            alert('Vui lòng điền đầy đủ thông tin đăng nhập.');
            return;
        }
        
        // Simulate login (would connect to backend in a real app)
        console.log('Login data:', { email, password, rememberMe });
        
        // Redirect to home page after successful login
        // alert('Đăng nhập thành công!');
        // window.location.href = 'main.html';
        // fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password, rememberMe })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         window.location.href = '/home';
        //     } else {
        //         alert(data.message || 'Login failed');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('An error occurred during login');
        // });
        window.location.href = '/home';
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