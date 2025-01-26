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
                const newTaskName = prompt('Edit task:', task.name);
                if (newTaskName) this.editTask(index, newTaskName);
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

const taskInput = document.getElementById('taskName');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

const taskManager = new TaskManager(taskList);

addTaskButton.onclick = () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        taskManager.addTask(taskName);
        taskInput.value = '';
    } else {
        alert('Please enter a task name.');
    }
};

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});
