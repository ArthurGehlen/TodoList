const task_list = document.getElementById("task_list");
const form = document.getElementById("form");

form.addEventListener("submit", add_task);

function add_task(e) {
    // Prevent form submission
    e.preventDefault();

    let task_name = document.getElementById("task_name").value;

    if (task_name) {
        create_task(task_name, false);
        save_tasks();
        document.getElementById("task_name").value = "";
    } else {
        alert("Please enter a task name");
    }
}

function create_task(name, is_bookmarked) {
    let task = document.createElement("li");

    let bookmark = document.createElement("span");
    let task_name = document.createElement("label");
    let delete_button = document.createElement("button");

    task_name.innerText = name;
    delete_button.innerText = "Delete";

    let bookmark_empty = `<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px" fill="black">
        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" stroke="black" stroke-width="2" fill="none"/>
    </svg>`;
    let bookmark_filled = `<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px" fill="#32CD32">
        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>`;

    bookmark.innerHTML = is_bookmarked ? bookmark_filled : bookmark_empty;

    task.appendChild(bookmark);
    task.appendChild(task_name);
    task.appendChild(delete_button);

    delete_button.addEventListener("click", delete_task);
    bookmark.addEventListener("click", toggle_bookmark);

    task_list.appendChild(task);
}

function toggle_bookmark() {
    let task = this.parentElement;

    let task_name = task.getElementsByTagName("label")[0].innerText;
    let saved_tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let task_index = saved_tasks.findIndex(t => t.name === task_name);

    if (task !== -1) {
        let is_bookmarked = saved_tasks[task_index].bookmarked;

        saved_tasks[task_index].bookmarked = !is_bookmarked;

        this.innerHTML = saved_tasks[task_index].bookmarked
            ? `<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px" fill="#32CD32">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
               </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 24 24" width="26px" fill="black">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" stroke="black" stroke-width="2" fill="none"/>
               </svg>`;

        localStorage.setItem("tasks", JSON.stringify(saved_tasks))
    }
}


function delete_task() {
    let task = this.parentElement;
    let task_name = task.getElementsByTagName("label")[0].innerText;

    let saved_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updated_tasks = saved_tasks.filter(t => t.name !== task_name);

    localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    task_list.removeChild(task);
}

function save_tasks() {
    let tasks = task_list.children;
    let tasks_array = [];

    for (let i = 0; i < tasks.length; i++) {
        let task_name = tasks[i].getElementsByTagName("label")[0].innerText;
        let is_bookmarked = tasks[i].getElementsByTagName("svg")[0].getAttribute("fill") === "#32CD32";
        tasks_array.push({ name: task_name, bookmarked: is_bookmarked });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks_array));
}

function load_tasks() {
    let saved_tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (let i = 0; i < saved_tasks.length; i++) {
        create_task(saved_tasks[i].name, saved_tasks[i].bookmarked);
    }
}

load_tasks();
