const task_list = document.getElementById("task_list");
const form = document.getElementById("form");

form.addEventListener("submit", add_task);

function add_task(e) {
    // Prevent form submission
    e.preventDefault();

    // Get task name
    let task_name = document.getElementById("task_name").value;

    // Check if task name is empty
    if (task_name) {
        // Create task
        create_task(task_name);

        // Save tasks
        save_tasks();

        // Clear task name input
        document.getElementById("task_name").value = "";
    }
    else {
        // If task name is empty, show alert
        alert("Please enter a task name");
        // Return to stop function execution
        return;
    }
}

function create_task(name) {
    // Create task element
    let task = document.createElement("li");

    // Create checkbox, task name and delete button
    let checkbox = document.createElement("input");
    let task_name = document.createElement("label");
    let delete_button = document.createElement("button");

    // Set checkbox type to checkbox
    checkbox.setAttribute("type", "checkbox");

    // Set task name text
    task_name.innerText = name;

    // Set delete button text
    delete_button.innerText = "Delete";

    // Append checkbox, task name and delete button to task
    task.appendChild(checkbox);
    task.appendChild(task_name);
    task.appendChild(delete_button);

    // Add event listener to delete button
    delete_button.addEventListener("click", delete_task);

    // Append task to task list
    task_list.appendChild(task);
}

function delete_task() {
    // Get task element
    let task = this.parentElement;

    // Remove task from local storage
    let task_name = task.getElementsByTagName("label")[0].innerText;

    // Get tasks from local storage
    let saved_tasks = JSON.parse(localStorage.getItem("tasks"));

    // Find task index
    let task_index = saved_tasks.indexOf(task_name);

    // Remove task from saved tasks
    saved_tasks.splice(task_index, 1);

    // Save updated tasks
    localStorage.setItem("tasks", JSON.stringify(saved_tasks));

    // Remove task element
    task_list.removeChild(task);
}

function save_tasks() {
    // Get all tasks
    let tasks = task_list.children;

    // Create tasks array
    let tasks_array = [];

    // Loop thorugh all tasks
    for (let i = 0; i < tasks.length; i++) {
        // Get task name 
        let task_name = tasks[i].getElementsByTagName("label")[0].innerText;

        // Add task name to tasks array
        tasks_array.push(task_name);
    }

    // Save tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks_array));
}

function load_tasks() {
    // Get tasks from local storage
    let saved_tasks = JSON.parse(localStorage.getItem("tasks"));

    // Loop through saved tasks
    for (let i = 0; i < saved_tasks.length; i++) {
        // Create task from saved tasks
        create_task(saved_tasks[i]);
    }
}

load_tasks();