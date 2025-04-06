document.addEventListener('DOMContentLoaded', function() {
    const tasksList = document.getElementById('tasksList');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const editForm = document.getElementById('editForm');
    const closeBtn = document.querySelector('.close-btn');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    
    let currentTaskId = null;
    
    // Fetch tasks on page load
    fetchTasks();
    
    // Close modal when clicking X button
    closeBtn.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.add('hidden');
        }
        if (e.target === deleteModal) {
            deleteModal.classList.add('hidden');
        }
    });
    
    // Cancel delete button
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
    });
    
    // Confirm delete button
    confirmDeleteBtn.addEventListener('click', deleteTask);
    
    // Edit form submission
    editForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.getElementById('editTitle').value.trim();
        const status = document.getElementById('editStatus').value;
        const taskId = document.getElementById('editTaskId').value;
        
        if (!title) {
            alert('Task title cannot be empty');
            return;
        }
        
        try {
            const response = await fetch(`https://mockapi.io/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    status
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Close modal and refresh tasks
            editModal.classList.add('hidden');
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task. Please try again.');
        }
    });
    
    // Fetch tasks from API
    async function fetchTasks() {
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        tasksList.innerHTML = '';
        
        try {
            const response = await fetch('https://mockapi.io/tasks');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const tasks = await response.json();
            displayTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            errorElement.classList.remove('hidden');
        } finally {
            loadingElement.classList.add('hidden');
        }
    }
    
    // Display tasks in the UI
    function displayTasks(tasks) {
        if (tasks.length === 0) {
            tasksList.innerHTML = '<li class="no-tasks">No tasks found. Add a task to get started!</li>';
            return;
        }
        
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.status === 'Completed' ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-status">Status: ${task.status}</div>
                </div>
                <div class="task-actions">
                    <button class="btn edit-btn" data-id="${task.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn delete-btn" data-id="${task.id}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            `;
            
            tasksList.appendChild(taskItem);
        });
        
        // Add event listeners to all edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', openEditModal);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', openDeleteModal);
        });
    }
    
    // Open edit modal with task data
    function openEditModal(e) {
        const taskId = e.target.closest('.edit-btn').dataset.id;
        const taskItem = e.target.closest('.task-item');
        const title = taskItem.querySelector('.task-title').textContent;
        const status = taskItem.querySelector('.task-status').textContent.replace('Status: ', '');
        
        document.getElementById('editTitle').value = title;
        document.getElementById('editStatus').value = status;
        document.getElementById('editTaskId').value = taskId;
        
        editModal.classList.remove('hidden');
    }
    
    // Open delete confirmation modal
    function openDeleteModal(e) {
        const taskId = e.target.closest('.delete-btn').dataset.id;
        document.getElementById('deleteTaskId').value = taskId;
        deleteModal.classList.remove('hidden');
    }
    
    // Delete task function
    async function deleteTask() {
        const taskId = document.getElementById('deleteTaskId').value;
        
        try {
            const response = await fetch(`https://mockapi.io/tasks/${taskId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Close modal and refresh tasks
            deleteModal.classList.add('hidden');
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task. Please try again.');
        }
    }
});
