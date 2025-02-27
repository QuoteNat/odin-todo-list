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
 * App class that stores and manages app logic and data. Returns data to be used for displaying the frontend.
 */
class App {
    #projects = [];
    constructor () {
        let inbox = new Project("Inbox");
        inbox.addTodo("Example todo", "This is an example of a todo!", new Date(), 0);
        let todo = inbox.getTodo(0);
        inbox.editTodo(0, "Example but i edited it!", null, null, null)
        this.#projects.push(inbox);
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
        this.#projects[project].todos[todo].toggleDone()
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
     * @returns The index of the new project
     */
    addProject(name) {
        return this.#projects.push(new Project(name)) - 1
    }

    deleteTodo(project, todo) {
        this.#projects[project].deleteTodo(todo);
    }

    editTodo(project, todoIndex, title, description, date) {
        this.#projects[project].editTodo(todoIndex, title, description, date, null);
    }
}

export default App;