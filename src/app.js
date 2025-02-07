/**
 * Class for creating TODO objects.
 */
class Todo {
    title = "";
    description = "";
    dueDate = new Date();
    priority = 0;
    #done = false;
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

    /**
     * Toggles the completion state of the todo
     */
    toggleDone() {
        this.#done = !this.#done;
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
        this.todos.push(new Todo(title, description, dueDate, priority));
        console.log("test");
        console.log(this.todos)
    }

    deleteTodo (index) {
        this.todos.splice(index, 1);
    }

    getTodo (index) {
        return this.todos[index];
    }
}

/**
 * App class that stores and manages app logic and data. Returns data to be used for displaying the frontend.
 */
class App {
    #projects = [];
    constructor () {
        this.#projects.push(new Project("Inbox"));
        this.#projects[0].addTodo("Example todo", "This is an example of a todo!", new Date(), 0);
        let todo = this.#projects[0].getTodo(0);
        todo.toggleDone();

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
}

export default App;