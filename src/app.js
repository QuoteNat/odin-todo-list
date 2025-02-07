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
    constructor (title, description, dueDate, priority) {
        Object.assign(this, { title, description, dueDate, priority });
    }
}

/**
 * Project class that stores a list of Todos
 */
class Project {
    #name = "";
    #todos = [];

    /**
     * Construct a new empty project
     * @param {string} name 
     */
    constructor (name) {
        this.name = name;
    }

    addTodo (title, description, dueDate, priority) {
        this.#todos.push(new Todo(title, description, dueDate, priority));
    }

    deleteTodo (index) {
        this.#todos.splice(index, 1);
    }

    /**
     * Returns project name
     */
    get name() {
        return this.#name;
    }

    /**
     * Returns a closure containing the current list of todos in a project
     */
    get todos() {
        return {
            todos: this.#todos
        };
    }
}

/**
 * App class that stores and manages app logic and data. Returns data to be used for displaying the frontend.
 */
class App {
    #projects = [];
    constructor () {};

    getProjectState(i) {
        let name = this.#projects[i].name;
        let todos = this.#projects[i].todos;
        return {name, todos};
    }
}

export default App;