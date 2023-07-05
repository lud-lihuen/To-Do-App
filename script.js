document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Cargar las tareas almacenadas en el Local Storage al cargar la página
    loadTasksFromLocalStorage();

    // Evento al hacer clic en el botón "Agregar"
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTaskToLocalStorage(taskText);
            // Limpiar el campo de entrada de tareas
            taskInput.value = '';
        }
    });

    // Evento al presionar la tecla "Enter" en el campo de entrada de tareas
    taskInput.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            // Simular clic en el botón "Agregar" al presionar "Enter"
            addTaskBtn.click();
        }
    });

    // Evento de cambio en el contenedor de la lista de tareas
    taskList.addEventListener('change', function (event) {
        const checkbox = event.target;
        if (checkbox.type === 'checkbox') {
            // Obtener el elemento padre (li) de la tarea y cambiar su estado completado
            const taskItem = checkbox.parentNode;
            taskItem.classList.toggle('completed');
            // Actualizar el estado de la tarea en el Local Storage
            updateTaskInLocalStorage(taskItem);
        }
    });

    // Evento al hacer clic en el botón "Eliminar" de una tarea
    taskList.addEventListener('click', function (event) {
        const deleteBtn = event.target;
        if (deleteBtn.classList.contains('btn-delete')) {
            // Obtener el elemento padre (li) de la tarea y eliminarla
            const taskItem = deleteBtn.closest('li');
            deleteTaskFromLocalStorage(taskItem);
            taskItem.remove();
        }
    });

    // Función para agregar una tarea a la lista
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('mr-2');
        taskItem.appendChild(checkbox);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'btn-delete', 'ml-2');
        deleteBtn.innerHTML = 'Borrar';
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    }

    // Función para cargar las tareas desde el Local Storage al cargar la página
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (task) {
            addTask(task.text);
            if (task.completed) {
                const taskItem = taskList.lastChild;
                taskItem.classList.add('completed');
                taskItem.firstChild.checked = true;
            }
        });
    }

    // Función para guardar una tarea en el Local Storage
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para actualizar el estado de una tarea en el Local Storage
    function updateTaskInLocalStorage(taskItem) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = Array.from(taskList.children).indexOf(taskItem);
        tasks[taskIndex].completed = taskItem.classList.contains('completed');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para eliminar una tarea del Local Storage
    function deleteTaskFromLocalStorage(taskItem) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = Array.from(taskList.children).indexOf(taskItem);
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});  