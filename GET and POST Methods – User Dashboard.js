document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const usersContainer = document.getElementById('usersContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    // Fetch and display users on page load
    fetchUsers();
    
    // Form submission handler
    userForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        
        // Validate form
        if (!validateForm(name, email)) {
            return;
        }
        
        try {
            // Create new user
            const newUser = { name, email };
            
            // Make POST request to add user
            const response = await fetch('https://mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 400 || response.status === 409) {
                    showMessage('error', errorData.message || 'Email already exists');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }
            
            // Clear form and show success message
            userForm.reset();
            showMessage('success', 'User added successfully!');
            
            // Refresh user list
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
            showMessage('error', 'Failed to add user. Please try again.');
        }
    });
    
    // Fetch users from API
    async function fetchUsers() {
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        usersContainer.innerHTML = '';
        
        try {
            const response = await fetch('https://mockapi.io/users');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            errorElement.classList.remove('hidden');
        } finally {
            loadingElement.classList.add('hidden');
        }
    }
    
    // Display users in the UI
    function displayUsers(users) {
        if (users.length === 0) {
            usersContainer.innerHTML = '<p class="no-users">No users found</p>';
            return;
        }
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
            `;
            usersContainer.appendChild(userCard);
        });
    }
    
    // Form validation
    function validateForm(name, email) {
        let isValid = true;
        
        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        
        // Validate name
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required';
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
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show message
    function showMessage(type, text) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = text;
        
        // Insert after the form
        userForm.parentNode.insertBefore(messageElement, userForm.nextSibling);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
});
