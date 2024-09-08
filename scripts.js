document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));   
}

function addTask() {
        const taskinput = document.getElementById('new-task');
        const tasktext = taskinput.value.trim();
        if(tasktext === '') return;
      
        const task = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };
        
        addTaskToDOM(task);
        saveTask(task);
        taskinput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.id = task.id;
    taskItem.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.onclick = () => toggleComplete(task.id);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteTask(task.id);

    taskItem.appendChild(taskText);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskid) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskid);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById(taskid).remove();
}

function editTask(taskid) {
    const taskitem = document.getElementById(taskid);
    const tasktext = taskitem.querySelector('span').textContent;
    const newtasktext = prompt('Edit task:', tasktext);
    if(newtasktext === null || newtasktext.trim() === '') return;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if(task.id === taskid){
             task.text = newtasktext;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskitem.querySelector('span').textContent = newtasktext;
}

function searchTasks() {
    const searchTerm = document.getElementById('search-task').value.toLowerCase();
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        const taskText = task.querySelector('span').textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}
