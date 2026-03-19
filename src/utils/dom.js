import { ProjectManager } from "./projectManager.js";

export function init() {
    const newprojectBtn = document.querySelector(".new-project-btn");
    const projectDialog = document.querySelector("#projectDialog");

    newprojectBtn.onclick = () => projectDialog.showModal();
}

export function renderProjects() {
    const projectList = document.querySelector(".project-list");
    const projects = ProjectManager.getProjects();


    projects.forEach((project) => {
        let projectElement = document.createElement("div");
        projectElement.className = "project";

        let projectText = document.createElement("h2");
        projectText.textContent = project.name;

        projectText.addEventListener("click", () => {
            const projectTitle = document.querySelector(".project-title");
            projectTitle.textContent = project.name;
        });

        projectElement.appendChild(projectText);
        projectList.appendChild(projectElement);
    });
}

