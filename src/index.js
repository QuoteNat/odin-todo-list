import App from "./app";
import "./styles.css";

/**
 * Updates the DOM to reflect the app state
 * @param {*} app 
 */
function updateDisplay(app) {
    const navigationList = document.getElementById("navigation-list");
    navigationList.textContent = "";
    let projects = app.getProjectList();
    console.log(projects);
    for (const project of projects) {
        console.log(project);
        const projectTag = document.createElement("p");
        projectTag.textContent = project;
        navigationList.appendChild(projectTag);
    }
}

let app = new App();
updateDisplay(app);