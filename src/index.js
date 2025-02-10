import App from "./app";
import "./styles.css";
import { format } from 'date-fns';

let currentProject = 0;

/**
 * Updates the DOM to reflect the app state
 * @param {*} app 
 */
function updateDisplay(app) {
    const navigationList = document.getElementById("navigation-list");
    const todolistDiv = document.getElementById("todos");
    navigationList.textContent = "";
    todolistDiv.textContent = "";

    let projects = app.getProjectList();
    console.log(projects);
    for (const project of projects) {
        console.log(project);
        const projectTag = document.createElement("p");
        projectTag.textContent = project;
        navigationList.appendChild(projectTag);
    }
    const newProject = document.createElement("button");
    newProject.textContent = "+ Create project";
    navigationList.appendChild(newProject);

    let projectTodos = app.getProjectState(currentProject);
    console.log(projectTodos.todos);
    for (const todo of projectTodos.todos) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const name = document.createElement("p");
        name.textContent = todo.title;
        const date = document.createElement("p");
        date.textContent = format(todo.dueDate, "MM/dd/yyyy")

        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(name);
        todoDiv.appendChild(date);
        todolistDiv.appendChild(todoDiv);
    }

    const newTask = document.createElement("button");
    newTask.textContent = "+ Create task";
    todolistDiv.appendChild(newTask);
}

let app = new App();
updateDisplay(app);