import App from "./app";
import "./styles.css";
import { format } from 'date-fns';

let currentProject = 0;


function addProject() {
    let projectName = window.prompt("What do you want your new project to be called?")
    currentProject = app.addProject(projectName)
    // Assume the user wants to switch to the newly created project
    updateDisplay(app)
}

/**
 * Updates the DOM to reflect the app state
 * @param {App} app 
 */
function updateDisplay(app) {
    const navigationList = document.getElementById("navigation-list");
    const todolistDiv = document.getElementById("todos");
    navigationList.textContent = "";
    todolistDiv.textContent = "";

    let projects = app.getProjectList();
    for (let i = 0; i < projects.length; i++) {
        const projectTag = document.createElement("p");
        projectTag.textContent = projects[i];
        projectTag.addEventListener("click", (counter) => {
            currentProject = i;
            updateDisplay(app);
        })
        navigationList.appendChild(projectTag);
    }
    const newProject = document.createElement("button");
    newProject.textContent = "+ Create project";
    newProject.addEventListener("click", addProject)
    navigationList.appendChild(newProject);

    let projectTodos = app.getProjectState(currentProject);
    let j = 0; 
    for (const todo of projectTodos.todos) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = app.getProjectState(currentProject).todos[j].getDone()
        checkbox.addEventListener("input", (_event) => {
            app.toggleDone(currentProject, j-1); // The -1 is necessary no I don't know why
        });
        const name = document.createElement("p");
        name.textContent = todo.title;
        const date = document.createElement("p");
        date.textContent = format(todo.dueDate, "MM/dd/yyyy")

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(name);
        todoDiv.appendChild(date);
        todolistDiv.appendChild(todoDiv);
        j++;
    }

    const newTask = document.createElement("button");
    newTask.textContent = "+ Create task";
    todolistDiv.appendChild(newTask);
}

let app = new App();
updateDisplay(app);