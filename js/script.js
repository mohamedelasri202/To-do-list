function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
  }

  function toggleForm() {
    const form = document.getElementById("myform");
    form.classList.toggle("hidden");
  }

  function validateForm() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("taskPriority").value;
    const status = document.getElementById("taskStatus").value;

    const titleRegex = /^[A-Za-z\s]{1,20}$/;
    let isValid = true;
    let errorMessage = "";

    if (!title.match(titleRegex)) {
      errorMessage +=
        "Title must only contain letters and be 1-20 characters long.\n";
      isValid = false;
    }

    if (description.length < 2 || description.length > 80) {
      errorMessage += "Description must be between 2 and 80 characters.\n";
      isValid = false;
    }

    if (!dueDate) {
      errorMessage += "Please select a due date.\n";
      isValid = false;
    }

    if (!priority) {
      errorMessage += "Please select a priority level.\n";
      isValid = false;
    }

    if (status === "" || status === "Select status") {
      errorMessage += "Please select a valid status.\n";
      isValid = false;
    }

    if (!isValid) {
      alert(errorMessage);
    }

    return isValid;
  }

  // Function to add a task
function addTask(event) {
event.preventDefault();

if (!validateForm()) {
    return;
}

// Get form values
const title = document.getElementById('taskTitle').value;
const priority = document.getElementById('taskPriority').value;
const description = document.getElementById('taskDescription').value;
const dueDate = document.getElementById('due-date').value;
const status = document.getElementById('taskStatus').value;

// Create a new card element
const card = createCard(title, priority, description, dueDate);

// Append the card to the appropriate container based on the selected status
let container;
if (status === "To Do") {
    taskContainerToDo.innerHTML += card;
} else if (status === "Doing") {
    taskContainerDoing.innerHTML += card;
} else if (status === "Done") {
    taskContainerDone.innerHTML += card;
}

// Clear form fields and hide the form
document.getElementById('taskForm').reset();
toggleForm();
}

// Function to create a task card
function createCard(title, priority, description, dueDate) {
let priorityColor = getPriorityColor(priority); // Get the corresponding color for the priority

let card = `
    <div id="taskCard" class="flex flex-col h-96">
        <div class="bg-indigo-500 m-3 rounded-md">
            <div class="flex justify-between mr-3 ml-3">
                <h4 id="title">${title}</h4>
                <h5>
                    <select class="bg-indigo-900 text-white rounded-md text-center w-16" onchange="updateTaskStatus(this)">
                        <option selected disabled>edit</option>
                        <option value="To Do">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </h5>
            </div>
            <div class="m-2 rounded-md h-28">
                <h4 id="description">${description}</h4>
            </div>
            <div class="flex justify-between mr-2 ml-2">
                <p class="rounded-md w-10 text-center" id="priority" style="background-color: ${priorityColor}; color: white;">${priority}</p>
                <button type="button" id="btn" class="bg-red-600 rounded-sm h-7 text-black w-24" onclick="deleteCard(this)">Delete</button>
                <p class="bg-slate-500 w-fit rounded-md text-center" id="dueDate">${dueDate}</p>
            </div>
        </div>
    </div>
`;

return card;
}

// Function to get the priority color based on the priority level
function getPriorityColor(priority) {
switch (priority) {
    case 'P1':
        return 'red';    // Color for priority 1
    case 'P2':
        return 'orange'; // Color for priority 2
    case 'P3':
        return 'green';  // Color for priority 3
    default:
        return 'black';   // Default color if no valid priority
}
}

// Function to delete a card
function deleteCard(button) {
// Find the card element 
const card = button.closest('#taskCard'); 
if (card) {
    card.remove(); // Remove the card from the DOM
}
}

// Function to update task status
function updateTaskStatus(selectElement) {
// Get the selected value
const newStatus = selectElement.value;

// Get the card element (the parent of the dropdown)
const card = selectElement.closest('#taskCard');

// Remove the card from its current container
const currentContainer = card.parentElement; // Get the current parent container
currentContainer.removeChild(card); // Remove the card from the current container

// Append the card to the new container based on the selected status
const newContainer = document.getElementById(`taskContainer${newStatus.replace(" ", "")}`); // Convert "To Do" to "ToDo"
newContainer.appendChild(card); // Append the card to the new container
}


function showTaskList() {
const form = document.getElementById('list');
form.classList.toggle('hidden');
}


