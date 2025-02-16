const task_list = document.getElementById("task_list");
const form = document.getElementById("form");

form.addEventListener("submit", add_task);

function add_task(e) {
    // Prevent form submission
    e.preventDefault();

    let task_name = document.getElementById("task_name").value;

    if (task_name) {
        create_task(task_name);
        save_tasks();

        document.getElementById("task_name").value = "";
    }
    else {
        alert("Please enter a task name");
        return;
    }
}

function create_task(name) {
    let task = document.createElement("li");

    let bookmark = document.createElement("span");
    let task_name = document.createElement("label");
    let delete_button = document.createElement("button");
    
    task_name.innerText = name;
    delete_button.innerText = "Delete";
    bookmark.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="-20 -1050 960 960" width="26px" fill="black"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>';

    task.appendChild(bookmark);
    task.appendChild(task_name);
    task.appendChild(delete_button);

    delete_button.addEventListener("click", delete_task);

    task_list.appendChild(task);
}

function delete_task() {
    let task = this.parentElement;

    // Remove task from local storage
    let task_name = task.getElementsByTagName("label")[0].innerText;

    let saved_tasks = JSON.parse(localStorage.getItem("tasks"));

    let task_index = saved_tasks.indexOf(task_name);

    saved_tasks.splice(task_index, 1);

    // Save updated tasks
    localStorage.setItem("tasks", JSON.stringify(saved_tasks));

    task_list.removeChild(task);
}

function save_tasks() {
    // Get all tasks
    let tasks = task_list.children;

    let tasks_array = [];

    for (let i = 0; i < tasks.length; i++) {
        let task_name = tasks[i].getElementsByTagName("label")[0].innerText;
        tasks_array.push(task_name);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks_array));
}

function load_tasks() {
    let saved_tasks = JSON.parse(localStorage.getItem("tasks"));

    for (let i = 0; i < saved_tasks.length; i++) {
        create_task(saved_tasks[i]);
    }
}

load_tasks();