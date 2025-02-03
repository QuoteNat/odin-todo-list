import { Project, Todo } from "./app.js"
console.log("Hello world!");

let test = new Todo("First todo", "An example TODO that you can make!", new Date(), 0);
let inbox = new Project("Inbox");
console.log(test);
console.log(inbox);