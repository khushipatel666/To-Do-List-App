let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let counter = document.getElementById("counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            showTasks();
        };

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";

        editBtn.onclick = () => {
            let updated = prompt("Edit your task:", task.text);

            if (updated !== null && updated.trim() !== "") {
                tasks[index].text = updated.trim();
                saveTasks();
                showTasks();
            }
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        };

        li.append(span, editBtn, deleteBtn);
        taskList.appendChild(li);
    });

    let completed = tasks.filter(t => t.completed).length;

    counter.textContent =
        `Total: ${tasks.length} | Completed: ${completed}`;
}

function addTask() {
    let value = taskInput.value.trim();

    if (!value) {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    showTasks();
}

function clearAll() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveTasks();
        showTasks();
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

showTasks();