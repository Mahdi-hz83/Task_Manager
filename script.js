const endpoint = "https://67e96055bdcaa2b7f5b94091.mockapi.io/tasks";
let taskList = [];

// Fetch tasks
async function loadTasks() {
    try {
        const response = await fetch(endpoint);
        taskList = await response.json();
        displayTasks(taskList);
    } catch (err) {
        console.error("Failed to fetch tasks:", err);
    }
}

// Display tasks with filters
function displayTasks(tasks) {
    const lists = {
        todo: document.getElementById("todo-list"),
        progress: document.getElementById("inprogress-list"),
        closed: document.getElementById("closed-list"),
        frozen: document.getElementById("frozen-list")
    };

    Object.values(lists).forEach(list => list.innerHTML = "");

    const keyword = document.getElementById("search").value.toLowerCase();
    const selectedPriority = document.getElementById("filter-priority").value;
    const selectedStatus = document.getElementById("filter-status").value;

    
    const filtered = tasks.filter(task => {
        const searchMatch = task.title.toLowerCase().includes(keyword) || task.description.toLowerCase().includes(keyword);
        const priorityMatch = selectedPriority ? task.priority.toLowerCase() === selectedPriority : true;
        const statusMatch = selectedStatus ? task.status === selectedStatus : true;
        return searchMatch && priorityMatch && statusMatch;
    });

    
    filtered.forEach(task => {
        const item = buildTaskItem(task);
        switch (task.status) {
            case "To Do":
                lists.todo.appendChild(item);
                break;
            case "In Progress":
                lists.progress.appendChild(item);
                break;
            case "Closed":
                lists.closed.appendChild(item);
                break;
            case "Frozen":
                lists.frozen.appendChild(item);
                break;
        }
    });
}

// Create task
function buildTaskItem(task) {
    const item = document.createElement("li");
    item.className = "task-item p-3 rounded-lg shadow-md cursor-pointer transition duration-300";
    item.draggable = true;
    item.dataset.taskId = task.id;

    const tagColor = task.priority.toLowerCase() === "low" ? "bg-green-500" :
                     task.priority.toLowerCase() === "medium" ? "bg-yellow-500" :
                     "bg-red-500";

    item.innerHTML = `
        <h4 class="font-bold">${task.title} <span class="text-xs ${tagColor} text-white px-2 py-1 rounded">${task.priority}</span></h4>
        <p class="text-xs opacity-75">Due: ${new Date(task.dueDate * 1000).toLocaleDateString()}</p>
        <div class="mt-2 flex gap-2">
            <button onclick="startEditing('${task.id}')" class="text-xs bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
            <button onclick="removeTask('${task.id}')" class="text-xs bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
    `;

    item.addEventListener("click", () => showTaskDetails(task));
    item.addEventListener("dragstart", () => item.classList.add("dragging"));
    item.addEventListener("dragend", () => item.classList.remove("dragging"));

    return item;
}

// Search
["search", "filter-priority", "filter-status"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => displayTasks(taskList));
    document.getElementById(id).addEventListener("change", () => displayTasks(taskList));
});


window.addEventListener("scroll", () => {
    const addBtn = document.getElementById("add-task-btn");
    window.scrollY > 200 ? addBtn.classList.remove("hidden") : addBtn.classList.add("hidden");
});

document.getElementById("add-task-btn").addEventListener("click", () => {
    document.getElementById("task-form").reset();
    document.getElementById("task-form").dataset.taskId = "";
    document.getElementById("modal-title").textContent = "Add Task";
    document.getElementById("task-modal").classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("task-modal").classList.add("hidden");
});

// Submit form (create or update task)
document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const taskId = form.dataset.taskId;

    const formData = {
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-description").value,
        dueDate: Math.floor(new Date(document.getElementById("task-due-date").value).getTime() / 1000),
        priority: document.getElementById("task-priority").value,
        status: document.getElementById("task-status").value,
    };

    if (taskId) {
        await fetch(`${endpoint}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
    } else {
        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
    }

    document.getElementById("task-modal").classList.add("hidden");
    loadTasks();
});

// Delete task
async function removeTask(id) {
    if (confirm("Delete this task permanently?")) {
        await fetch(`${endpoint}/${id}`, { method: "DELETE" });
        loadTasks();
    }
}

// Edit task
function startEditing(id) {
    const task = taskList.find(t => t.id === id);
    document.getElementById("modal-title").textContent = "Edit Task";
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-description").value = task.description;
    document.getElementById("task-due-date").value = new Date(task.dueDate * 1000).toISOString().split("T")[0];
    document.getElementById("task-priority").value = task.priority.toLowerCase();
    document.getElementById("task-status").value = task.status;
    document.getElementById("task-form").dataset.taskId = task.id;
    document.getElementById("task-modal").classList.remove("hidden");
}

document.querySelectorAll(".task-list").forEach(col => {
    col.style.maxHeight = "300px";
    col.style.overflowY = "auto";
});

loadTasks();  
