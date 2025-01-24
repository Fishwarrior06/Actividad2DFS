1// Clase que representa una Tarea
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    // Método para marcar la tarea como completada
    toggleComplete() {
        this.completed = !this.completed;
    }
}

// Clase que maneja las tareas
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    // Método para añadir una tarea
    addTask(description) {
        const newTask = new Task(description);
        this.tasks.push(newTask);
        this.renderTasks();
    }

    // Método para eliminar una tarea
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    }

    // Método para marcar una tarea como completada
    toggleTaskComplete(index) {
        this.tasks[index].toggleComplete();
        this.renderTasks();
    }

    // Método para renderizar las tareas en la interfaz
    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Limpiar lista antes de renderizar

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <span>${task.description}</span>
                <button onclick="taskManager.toggleTaskComplete(${index})">
                    ${task.completed ? 'Desmarcar' : 'Marcar como completada'}
                </button>
                <button onclick="taskManager.removeTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(li);
        });
    }
}

// Instanciamos el TaskManager
const taskManager = new TaskManager();

// Función que se ejecuta al presionar el botón de añadir tarea
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();
    
    if (taskDescription) {
        taskManager.addTask(taskDescription);
        taskInput.value = ''; // Limpiar el campo de entrada
    }
}


// Abrir y cerrar el modal
const modal = document.getElementById('taskModal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

openModal.onclick = () => modal.style.display = 'flex';
closeModal.onclick = () => modal.style.display = 'none';

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};