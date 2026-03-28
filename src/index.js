import "./style.css";
import { Task } from "./models/Task.js";
import { Project } from "./models/Project.js";
import { ProjectManager } from "./storage/ProjectManager.js";
import { renderProjects, renderTasks, showTaskInfo } from "./ui/render.js";

let currentProjectId = null;
let currentTask = null;

// ===== DOM refs =====
const projectTitleEl    = document.querySelector(".project-title");
const taskInfo          = document.getElementById("taskInfo");
const projectDialog     = document.querySelector("#projectDialog");
const projectForm       = document.querySelector("#projectForm");
const projectTitleInput = document.querySelector("#projectTitleValue");
const taskDialog        = document.querySelector("#taskDialog");
const taskForm          = document.querySelector("#taskForm");
const taskTitleInput    = document.querySelector("#taskTitleValue");
const taskDescInput     = document.querySelector("#taskDescriptionValue");
const taskDueInput      = document.querySelector("#taskDueDateValue");
const taskPriorityInput = document.querySelector("#taskPriorityValue");
const editTaskDialog    = document.querySelector("#editTaskDialog");
const editTaskForm      = document.querySelector("#editTaskForm");
const editTitleInput    = document.querySelector("#editTaskTitleValue");
const editDescInput     = document.querySelector("#editTaskDescriptionValue");
const editDueInput      = document.querySelector("#editTaskDueDateValue");
const editPriorityInput = document.querySelector("#editTaskPriorityValue");

// ===== Helpers =====
function getCurrentProject() {
  return ProjectManager.getProjects().find(p => p.id === currentProjectId) ?? null;
}

function refresh() {
  renderProjects(ProjectManager.getProjects(), currentProjectId, {
    onSelect: id => {
      currentProjectId = id;
      currentTask = null;
      taskInfo.style.display = "none";
      projectTitleEl.textContent = getCurrentProject().name;
      refresh();
    },
    onDelete: id => {
      ProjectManager.removeProject(id);
      if (currentProjectId === id) {
        currentProjectId = null;
        currentTask = null;
        taskInfo.style.display = "none";
        projectTitleEl.textContent = "Select a project";
      }
      refresh();
    }
  });

  renderTasks(getCurrentProject(), {
    onSelect: task => {
      currentTask = task;
      showTaskInfo(task);
    }
  });
}

// ===== Dialog triggers =====
document.querySelector(".new-project-btn").onclick = () => projectDialog.showModal();
document.querySelector(".newTaskBtn").onclick = () => {
  if (!currentProjectId) return alert("Select a project first!");
  taskDialog.showModal();
};

// ===== Add Project =====
projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = projectTitleInput.value.trim();
  if (!name) return;
  const proj = new Project(name);
  ProjectManager.addProject(proj);
  currentProjectId = proj.id;
  projectTitleEl.textContent = proj.name;
  projectForm.reset();
  projectDialog.close();
  refresh();
});

// ===== Add Task =====
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const title    = taskTitleInput.value.trim();
  const desc     = taskDescInput.value.trim();
  const due      = taskDueInput.value;
  const priority = taskPriorityInput.value;
  if (!title || !due) return;

  const project = getCurrentProject();
  if (!project) return alert("Select a project first!");
  project.addTask(new Task(title, desc, due, priority));
  ProjectManager.save();
  taskForm.reset();
  taskDialog.close();
  refresh();
});

// ===== Delete Task =====
document.getElementById("taskDeleteBtn").onclick = () => {
  if (!currentTask) return;
  const project = getCurrentProject();
  if (!project) return;
  project.removeTask(currentTask.id);
  ProjectManager.save();
  currentTask = null;
  taskInfo.style.display = "none";
  refresh();
};

// ===== Edit Task - open dialog prefilled =====
document.getElementById("taskEditBtn").onclick = () => {
  if (!currentTask) return;
  editTitleInput.value    = currentTask.title;
  editDescInput.value     = currentTask.description;
  editDueInput.value      = currentTask.dueDate;
  editPriorityInput.value = currentTask.priority;
  editTaskDialog.showModal();
};

// ===== Edit Task - save =====
editTaskForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!currentTask) return;
  currentTask.title       = editTitleInput.value.trim();
  currentTask.description = editDescInput.value.trim();
  currentTask.dueDate     = editDueInput.value;
  currentTask.priority    = editPriorityInput.value;
  ProjectManager.save();
  editTaskDialog.close();
  showTaskInfo(currentTask);
  refresh();
});

// ===== Init =====
if (ProjectManager.getProjects().length === 0) {
  const defaultProj = new Project("Default");
  ProjectManager.addProject(defaultProj);
  currentProjectId = defaultProj.id;
} else {
  currentProjectId = ProjectManager.getProjects()[0].id;
}

projectTitleEl.textContent = getCurrentProject()?.name ?? "Select a project";
refresh();