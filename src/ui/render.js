import { getPriorityColor } from "./helpers.js";

export function renderProjects(projects, currentProjectId, { onSelect, onDelete }) {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";

  projects.forEach(project => {
    const projectEl = document.createElement("div");
    projectEl.className = "project";
    if (project.id === currentProjectId) projectEl.classList.add("selected");

    const nameEl = document.createElement("h2");
    nameEl.textContent = project.name;
    nameEl.style.flex = "1";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑 Delete";
    deleteBtn.onclick = e => { e.stopPropagation(); onDelete(project.id); };

    projectEl.onclick = () => onSelect(project.id);
    projectEl.appendChild(nameEl);
    projectEl.appendChild(deleteBtn);
    projectList.appendChild(projectEl);
  });
}

export function renderTasks(project, { onSelect }) {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";
  if (!project) return;

  project.tasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";

    const priorityCircle = document.createElement("span");
    priorityCircle.className = "priority-circle";
    priorityCircle.style.backgroundColor = getPriorityColor(task.priority);

    const titleEl = document.createElement("span");
    titleEl.textContent = task.title;

    taskEl.appendChild(priorityCircle);
    taskEl.appendChild(titleEl);
    taskEl.onclick = () => onSelect(task);
    taskList.appendChild(taskEl);
  });
}

export function showTaskInfo(task) {
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description;
  document.getElementById("taskDueDate").textContent = task.dueDate;

  const prioritySpan = document.getElementById("taskPriority");
  prioritySpan.innerHTML = "";

  const circle = document.createElement("span");
  circle.className = "priority-circle";
  circle.style.backgroundColor = getPriorityColor(task.priority);

  const label = document.createElement("span");
  label.textContent = task.priority;

  prioritySpan.appendChild(circle);
  prioritySpan.appendChild(label);

  document.getElementById("taskInfo").style.display = "block";
}