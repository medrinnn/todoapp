import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

let projects = [];

const load = () => {
  const stored = JSON.parse(localStorage.getItem("projectData")) || [];
  projects = stored.map(p => {
    const proj = new Project(p.name, p.id);
    proj.tasks = (p.tasks || []).map(t => new Task(t.title, t.description, t.dueDate, t.priority, t.id));
    return proj;
  });
};

const save = () => localStorage.setItem("projectData", JSON.stringify(projects));
const addProject = p => { projects.push(p); save(); };
const removeProject = id => { projects = projects.filter(p => p.id !== id); save(); };
const getProjects = () => projects;

load();

export const ProjectManager = { addProject, removeProject, getProjects, save };