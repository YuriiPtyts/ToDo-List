const searchBarInput = document.querySelector(".search-bar");
const addButton = document.querySelector(".add-button");
const tasksContainer = document.querySelector(".tasks-container");
const tasksRemaining = document.querySelector(".tasks-remaining");
const tasksAmount = document.querySelector(".tasks-amount");
let tasksArr = [];

let tasksCounter = 0;
let taskId = 0;

// const task = searchBarInput.value;

//task.typeOf() String?
// NO NEED
// input always string

searchBarInput.addEventListener("keydown", (event) => {
    let input = searchBarInput.value;

    if(event.key === "Enter"){
        if (/\S/.test(input)) {
            let regex = /^\s+|\s+$/g; 
            let validInput = input.replace(regex, "");
            toDo(validInput);
            changeRemaining();
        }else{
            alert("Enter valid task");
        }
        searchBarInput.value ="";
    }
});

addButton.addEventListener("click", () =>{
    let input = searchBarInput.value;
    
    if (/\S/.test(input)) {
        let regex = /^\s+|\s+$/g; 
        let validInput = input.replace(regex, "");
        toDo(validInput);
        changeRemaining();
    }else{
        alert("Enter valid task");
    }
    searchBarInput.value ="";
    
});

function toDo(task) {
    tasksCounter++;

    let noTasks = document.querySelector(".no-tasks");
    if(noTasks){
        noTasks.remove();
    }
    let newDiv = document.createElement("div");
    newDiv.className = "task";
    newDiv.id = `task${++taskId}`
    tasksContainer.appendChild(newDiv);

    let newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.className = "checkbox";
    newCheckbox.id = `checkbox${taskId}`;
    newDiv.appendChild(newCheckbox);

    const newTask = {
        id: taskId,
        task: task
    };

    tasksArr.push(newTask);
    console.log(tasksArr);

    let newLabel = document.createElement("label");
    newLabel.id = `label${taskId}`;
    newLabel.htmlFor = `checkbox${taskId}`;
    newLabel.appendChild(document.createTextNode(task));
    newDiv.appendChild(newLabel);

    let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "delete-button";
    newDeleteButton.id =`deleteButton${taskId}`;
    newDeleteButton.innerText = "X";
    newDiv.appendChild(newDeleteButton);

    let deleteButton = document.querySelector(`#deleteButton${taskId}`);
    deleteButton.addEventListener("click", ()=> {
        newDiv.remove();

        const deleteButtonId =getId(deleteButton);
        taskObjectDelete(deleteButtonId);

        tasksCounter--;
        changeRemaining();

        if (tasksContainer.children.length === 0) {
            let newH4 = document.createElement("h4");
            newH4.className = "no-tasks";
            newH4.id = "taskH4";
            newH4.innerText = "No tasks yet. Add one to get started!";
            tasksContainer.appendChild(newH4);
        }
    });

    let checkbox = document.querySelector(`#checkbox${taskId}`);
    let label = document.querySelector(`#label${taskId}`);
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "none";
        }
    });
}

function changeRemaining() {
    tasksRemaining.textContent = `${tasksCounter} tasks remaining`;
}

function taskObjectDelete(taskId) {
    tasksArr = tasksArr.filter(taskInArr => taskInArr.id !== taskId);
}

function getId(object) {
    const fullId = object.id;
    const idNumberAsObject = fullId.match(/\d+\.?\d*/g);
    const idNumber = idNumberAsObject.toString();
    return Number(idNumber);
}

