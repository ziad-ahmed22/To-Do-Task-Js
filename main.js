// Theme Code
if (localStorage.getItem('todoTheme')) {
    document.body.dataset.theme = localStorage.getItem('todoTheme');
}
document.querySelector('header i').onclick = (e) => {
    if (document.body.dataset.theme === 'light') {
        e.currentTarget.classList.add('white');
        document.body.dataset.theme = 'dark';
    } else {
        e.currentTarget.classList.remove('white');
        document.body.dataset.theme = 'light';
    }
    localStorage.setItem('todoTheme', document.body.dataset.theme);
}

// TO DO Code
let tasksDiv = document.querySelector('.tasks');
let input = document.querySelector('[type="text"]');
let form = document.forms[0];
let tasksArr = [];

tasksArr.length <=0 ? localStorage.removeItem('tasks') : "";

getFromStorage();

form.onsubmit = e => {
    e.preventDefault();
    if (input.value !== "") {
        addToArr(input.value);
        addToPage(tasksArr);
        addToStorage(tasksArr);
        input.value = "";
    }
}

tasksDiv.addEventListener('click', e => {
    // Delete Task
    if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
        deleteFromStorage(e.target.parentElement.dataset.id)
    }
    // Edit Done Status
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
        editStorage(e.target.dataset.id);
    }
    // Delete All Tasks
    if (e.target.classList.contains('del-all-btn')) {
        tasksDiv.textContent = "";
        localStorage.removeItem('tasks');
    }
});

function addToArr(inpuVal) {
    let task = {
        id: Date.now(),
        title: inpuVal,
        done: false
    }
    tasksArr.push(task);
}

function addToPage(arr) {
    tasksDiv.textContent = "";
    for(let i = 0; i < arr.length; i++) {

        let div = document.createElement('div');
        div.className = 'task';
        div.setAttribute('data-id',arr[i].id)
        arr[i].done ? div.classList.add('done') : "";
        div.appendChild(document.createTextNode(arr[i].title));

        let delBtn = document.createElement('span');
        delBtn.className = 'del';
        delBtn.appendChild(document.createTextNode('X'));
        div.appendChild(delBtn);

        tasksDiv.prepend(div);
    }
    tasksArr.length >= 2 ? deleteAllBtn() : "";
}

function deleteAllBtn() {
    let delAllDiv = document.createElement('div');
    delAllDiv.className = 'del-all' ;

    let delAllDtn = document.createElement('button');
    delAllDtn.classList.add('del-all-btn');
    delAllDtn.appendChild(document.createTextNode('Delete All'));

    delAllDiv.appendChild(delAllDtn);
    tasksDiv.appendChild(delAllDiv);
}

function addToStorage(arr) {
    localStorage.setItem('tasks', JSON.stringify(arr));
}

function getFromStorage() {
    if(localStorage.getItem('tasks')) {
        tasksArr = JSON.parse(localStorage.getItem('tasks'));
        addToPage(tasksArr)
    }
}

function deleteFromStorage(taskId) {
    tasksArr = tasksArr.filter(task => task.id != taskId);
    addToStorage(tasksArr);
}

function editStorage(taskId) {
    for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].id == taskId) {
            tasksArr[i].done ? tasksArr[i].done = false : tasksArr[i].done = true;
        }
    }
    addToStorage(tasksArr);
}