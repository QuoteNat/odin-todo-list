import { parseJSON } from 'date-fns';

/**
 * Class for creating TODO objects.
 */
class Todo {
    title = "";
    description = "";
    dueDate = new Date();
    priority = 0;
    done = false;
    /**
     * Creates a new Todo object
     * @param {string} title 
     * @param {string} description 
     * @param {Date} dueDate 
     * @param {Number} priority 
     */
    constructor (title, description, dueDate, priority, done) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;

    }

    /**
     * Toggles the completion state of the todo
     */
    toggleDone() {
        this.done = !this.done;
    }

    /**
     * 
     */
    getDone() {
        return this.done;
    }
}

/**
 * Project class that stores a list of Todos
 */
class Project {
    name = "";
    todos = [];

    /**
     * Construct a new empty project
     * @param {string} name 
     */
    constructor (name) {
        this.name = name;
    }

    addTodo (title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority, false));
    }

    deleteTodo (index) {
        this.todos.splice(index, 1);
    }

    getTodo (index) {
        return this.todos[index];
    }

    /**
     * Edit a todo at an index.
     * 
     * If a given parameter is null, no changes will be made to that value.
     * @param {*} index 
     * @param {*} title 
     * @param {*} description 
     * @param {*} dueDate 
     * @param {*} priority 
     */
    editTodo (index, title, description, dueDate, priority) {
        let todo = this.getTodo(index);
        if (title != null) {
            todo.title = title;
        }
        if (description != null) {
            todo.description = description;
        }
        if (dueDate != null) {
            todo.dueDate = dueDate;
        }
        if (priority != null) {
            todo.priority = priority;
        }
    }
}

/**
 * Tests whether localStorage or sessionStorage apis are available
 * from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
 * @param {string} type 
 * @returns 
 */
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
  

/**
 * App class that stores and manages app logic and data. Returns data to be used for displaying the frontend.
 */
class App {
    #projects = [];
    constructor () {
        if (this.loadFromLocalStorage()) {
            this.saveToLocalStorage();
        } else {
            let inbox = new Project("Inbox");
            inbox.addTodo("Example todo", "This is an example of a todo!", new Date(), 0);
            this.#projects.push(inbox);
            console.log(localStorage.getItem("projects"));
            this.saveToLocalStorage();
        }
    }

    loadFromLocalStorage() {
        // Only load from localStorage if it's available and something was saved there
        if (storageAvailable("localStorage") && localStorage.getItem("projects") != null) {
            let projects = JSON.parse(localStorage.getItem("projects"));
            console.log(projects.length);
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].name != undefined) {
                    this.addProject(projects[i].name);
                    // let currentProject = i;
                    console.log(projects[i].todos);
                    for (let j = 0; j < projects[i].todos.length; j++) {
                        let todo = projects[i].todos[j];
                        console.log(todo.dueDate);
                        this.addTodo(i, todo.title, todo.description, parseJSON(todo.dueDate));
                    }
                }
            }
            console.log(projects);
            console.log(this.#projects.length)
            return true;
        } else {
            return false;
        }
    }

    saveToLocalStorage() {
        if (storageAvailable("localStorage")) {
            let projects = this.getProjectList();
            for (let i = 0; i < projects.length; i++) {
                projects[i] = this.getProjectState(i);
            }
            console.log(projects);
            localStorage.setItem("projects", JSON.stringify(projects));
            console.log(localStorage.getItem("projects"));
        } else {
            console.log("Local storage unavailable");
        }
    }

    getProjectState(i) {
        let name = this.#projects[i].name;
        let todos = this.#projects[i].todos;
        return {name, todos};
    }

    getProjectList() {
        return this.#projects.map((project) => {
            return project.name;
        });
    }

    /**
     * Toggle the completion status of a todo
     * @param {int} project The index of the project
     * @param {int} todo The index of the todo
     */
    toggleDone(project, todo) {
        this.#projects[project].todos[todo].toggleDone();
        this.saveToLocalStorage();
    }

    /**
     * Get the completion status of a todo
     * @param {int} project The index of the project
     * @param {int} todo The index of the todo
     * @returns Completion status of the todo
     */
    getDone(project, todo) {
        return this.#projects[project].todos[todo].done
    }
    /**
     * Add a new project to the app
     * @param {string} name Name of the new project
     */
    addProject(name) {
        this.#projects.push(new Project(name));
        this.saveToLocalStorage();
    }

    deleteTodo(project, todo) {
        this.#projects[project].deleteTodo(todo);
        this.saveToLocalStorage();
    }

    editTodo(project, todoIndex, title, description, date) {
        this.#projects[project].editTodo(todoIndex, title, description, date, null);
        this.saveToLocalStorage();
    }

    addTodo(project, title, description, date) {
        this.#projects[project].addTodo(title, description, date, 0);
        this.saveToLocalStorage();
    }
}

export default App;