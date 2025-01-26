class Task {
    constructor(name) {
        this.name = name;
        this.completed = false; // Añadido para controlar el estado de completado
    }

    edit(newName) {
        this.name = newName;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor(taskListElement) {
        this.tasks = this.loadTasks();
        this.taskListElement = taskListElement;
        this.render();
    }

    addTask(taskName) {
        const task = new Task(taskName);
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.render();
    }

    editTask(index, newName) {
        this.tasks[index].edit(newName);
        this.saveTasks();
        this.render();
    }

    toggleTaskCompleted(index) {
        this.tasks[index].toggleCompleted();
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks.map(task => ({ name: task.name, completed: task.completed }))));
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        const parsedTasks = tasks ? JSON.parse(tasks) : [];
        return parsedTasks.map(taskData => new Task(taskData.name, taskData.completed));
    }

    render() {
        this.taskListElement.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const span = document.createElement('span');
            span.textContent = task.name;
            if (task.completed) {
                span.innerHTML += ' &#10003;'; // Añade el checkmark (palomita)
            }
            li.appendChild(span);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.className = 'edit';
            editButton.onclick = () => {
                openEditModal(task, index);
            };
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => openDeleteModal(index);
            li.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Desmarcar' : 'Marcar como completada';
            completeButton.className = 'completed';
            completeButton.onclick = () => this.toggleTaskCompleted(index);
            li.appendChild(completeButton);

            this.taskListElement.appendChild(li);
        });
    }
}

// Función para abrir el modal de añadir tarea
const openAddModal = () => {
    const modal = document.getElementById('addTaskModal');
    modal.style.display = 'flex';
};

const openEditModal = (task, index) => {
    const modal = document.getElementById('editTaskModal');
    const input = document.getElementById('editTaskName');
    const confirmButton = document.getElementById('confirmEdit');
    const cancelButton = document.getElementById('cancelEdit');

    input.value = task.name;
    modal.style.display = 'flex';

    confirmButton.onclick = () => {
        const newTaskName = input.value.trim();
        if (newTaskName) {
            taskManager.editTask(index, newTaskName);
            modal.style.display = 'none';
        }
    };

    cancelButton.onclick = () => {
        modal.style.display = 'none';
    };
};

const openDeleteModal = (index) => {
    const modal = document.getElementById('deleteTaskModal');
    const confirmDeleteButton = document.getElementById('confirmDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');

    modal.style.display = 'flex';

    confirmDeleteButton.onclick = () => {
        taskManager.deleteTask(index);
        modal.style.display = 'none';
    };

    cancelDeleteButton.onclick = () => {
        modal.style.display = 'none';
    };
};

// Añadir tarea
const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.onclick = openAddModal;

// Modal botones
const confirmAddTaskBtn = document.getElementById('confirmAddTask');
const cancelAddTaskBtn = document.getElementById('cancelAddTask');

const taskListElement = document.getElementById('taskList');
const taskManager = new TaskManager(taskListElement);

confirmAddTaskBtn.onclick = () => {
    const taskNameInput = document.getElementById('taskNameInput');
    const taskName = taskNameInput.value.trim();

    if (taskName) {
        taskManager.addTask(taskName);
        taskNameInput.value = ''; // Limpiar input
        document.getElementById('addTaskModal').style.display = 'none';
    }
};

cancelAddTaskBtn.onclick = () => {
    document.getElementById('addTaskModal').style.display = 'none';
};