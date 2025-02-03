/**
 * Class for creating TODO objects.
 */
class Todo {
    title = "";
    description = "";
    dueDate = new Date();
    priority = 0;
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