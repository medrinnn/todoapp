class Project {
    tasks = [];

    constructor(name, id = crypto.randomUUID()) {
        this.name = name;
        this.id = id;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

export default Project;