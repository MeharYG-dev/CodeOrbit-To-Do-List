// Get HTML elements
const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");

const clearButton = document.getElementById("clearButton");


// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display existing tasks
displayTasks();


// Add Task
addButton.addEventListener("click", addTask);


// Allow Enter key to add task
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Function to add task
function addTask() {

    const taskText = taskInput.value.trim();


    // Check empty task
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create task object
    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(task);


    // Save tasks
    saveTasks();


    // Display tasks
    displayTasks();


    // Clear input
    taskInput.value = "";

}


// Function to display tasks
function displayTasks() {

    // Clear existing list
    taskList.innerHTML = "";


    // Check if there are no tasks
    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks added yet.</p>";

        return;
    }


    // Loop through tasks
    tasks.forEach(function(task) {

        // Create list item
        const li = document.createElement("li");

        li.className = "task-item";


        // Create task text
        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Add completed class
        if (task.completed) {

            span.classList.add("completed");

        }


        // Click task to mark completed
        span.addEventListener("click", function() {

            toggleTask(task.id);

        });


        // Create button container
        const buttonContainer =
            document.createElement("div");

        buttonContainer.className = "task-buttons";


        // Create Edit button
        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-button";


        editButton.addEventListener("click", function() {

            editTask(task.id);

        });


        // Create Delete button
        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add buttons
        buttonContainer.appendChild(editButton);

        buttonContainer.appendChild(deleteButton);


        // Add elements to list item
        li.appendChild(span);

        li.appendChild(buttonContainer);


        // Add list item to page
        taskList.appendChild(li);

    });

}


// Edit Task
function editTask(id) {

    // Find task
    const task = tasks.find(function(task) {

        return task.id === id;

    });


    if (!task) {

        return;

    }


    // Ask user for new task
    const newText = prompt(
        "Edit your task:",
        task.text
    );


    // Check user input
    if (newText === null) {

        return;

    }


    const updatedText = newText.trim();


    if (updatedText === "") {

        alert("Task cannot be empty.");

        return;

    }


    // Update task
    task.text = updatedText;


    // Save and display
    saveTasks();

    displayTasks();

}


// Delete Task
function deleteTask(id) {

    // Ask for confirmation
    const confirmDelete =
        confirm("Are you sure you want to delete this task?");


    if (!confirmDelete) {

        return;

    }


    // Remove task
    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    // Save and display
    saveTasks();

    displayTasks();

}


// Mark task completed
function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });


    // Save and display
    saveTasks();

    displayTasks();

}


// Clear all tasks
clearButton.addEventListener("click", function() {

    if (tasks.length === 0) {

        alert("There are no tasks to clear.");

        return;

    }


    const confirmClear =
        confirm("Delete all tasks?");


    if (!confirmClear) {

        return;

    }


    // Empty tasks array
    tasks = [];


    // Save and display
    saveTasks();

    displayTasks();

});


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}