let tasks = [];

function updateDateTime() {
    const now = new Date();
    document.getElementById("currentDateTime").innerText = now.toLocaleString();
}

setInterval(updateDateTime, 1000);
updateDateTime();

function formatTimeTo12Hour(time) {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minutes} ${ampm}`;
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-box";

        if (task.priority === "high") {
            li.style.backgroundColor = "#ffcccb";
        } else if (task.priority === "medium") {
            li.style.backgroundColor = "#ffebc0";
        } else if (task.priority === "low") {
            li.style.backgroundColor = "#d1ffd1";
        }

        li.innerHTML = `
            <div style="text-align: center;">
                <span>Task: ${task.name}</span><br>
                <span>Time: ${task.time ? task.time : ''}  Deadline: ${task.deadline}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;
    const time = document.getElementById("time").value;

    const formattedTime = formatTimeTo12Hour(time);

    tasks.push({ name: taskName, priority, deadline, time: formattedTime });
    displayTasks();
    document.getElementById("taskForm").reset();
    showSuccessMessage("Task added successfully!");
});

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

document.getElementById("sortByDeadline").addEventListener("click", () => {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    displayTasks();
});

document.getElementById("sortByPriority").addEventListener("click", () => {
    tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    displayTasks();
});

document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.querySelector(".icon-sun").style.display = isDarkMode ? "none" : "block";
    document.querySelector(".icon-moon").style.display = isDarkMode ? "block" : "none";
});
