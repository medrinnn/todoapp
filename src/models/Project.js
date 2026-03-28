export class Project {
  constructor(name, id = crypto.randomUUID()) {
    this.name = name;
    this.id = id;
    this.tasks = [];
  }
  addTask(task) { this.tasks.push(task); }
  removeTask(taskId) { this.tasks = this.tasks.filter(t => t.id !== taskId); }
}