class Task {
    constructor(name) {
        this.name = name;
    }

    edit(newName) {
        this.name = newName;
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

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks.map(task => ({ name: task.name }))));
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        const parsedTasks = tasks ? JSON.parse(tasks) : [];
        return parsedTasks.map(taskData => new Task(taskData.name));
    }

    render() {
        this.taskListElement.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const span = document.createElement('span');
            span.textContent = task.name;
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
            deleteButton.onclick = () => this.deleteTask(index);
            li.appendChild(deleteButton);

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

const taskInput = document.getElementById('taskNameInput');
const addTaskButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const addTaskModal = document.getElementById('addTaskModal');
const confirmAddTask = document.getElementById('confirmAddTask');
const cancelAddTask = document.getElementById('cancelAddTask');

const taskManager = new TaskManager(taskList);

addTaskButton.onclick = openAddModal;

confirmAddTask.onclick = () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        taskManager.addTask(taskName);
        taskInput.value = '';
        addTaskModal.style.display = 'none';
    }
};

cancelAddTask.onclick = () => {
    addTaskModal.style.display = 'none';
};
