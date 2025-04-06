document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const loadingElement = document.getElementById('loading');
    const messageElement = document.getElementById('message');
    
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset previous messages and errors
        messageElement.classList.add('hidden');
        clearErrorMessages();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value
        };
        
        // Show loading state
        loadingElement.classList.remove('hidden');
        
        try {
            // Make POST request to API
            const response = await fetch('https://mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                // Handle API errors (e.g., email already exists)
                if (response.status === 400 || response.status === 409) {
                    showErrorMessage(data.message || 'Registration failed. Email may already exist.');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }
            
            // Registration successful
            showSuccessMessage('Registration successful! Welcome, ' + formData.name);
            registrationForm.reset();
        } catch (error) {
            console.error('Error during registration:', error);
            showErrorMessage('An error occurred during registration. Please try again.');
        } finally {
            loadingElement.classList.add('hidden');
        }
    });
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validate name
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        // Validate password
        if (password === '') {
            document.getElementById('passwordError').textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function clearErrorMessages() {
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
    }
    
    function showSuccessMessage(message) {
        messageElement.textContent = message;
        messageElement.className = 'message success';
        messageElement.classList.remove('hidden');
    }
    
    function showErrorMessage(message) {
        messageElement.textContent = message;
        messageElement.className = 'message error';
        messageElement.classList.remove('hidden');
    }
});
