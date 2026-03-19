import "./style.css";
import { renderProjects, init } from "./utils/dom.js";
import Project from "./utils/project.js";
import { ProjectManager } from "./utils/projectManager.js";

let defaultProject = new Project("Default");
let testProject = new Project("Test");
ProjectManager.addProject(defaultProject);
ProjectManager.addProject(testProject);

renderProjects();
init();
