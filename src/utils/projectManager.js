import Project from "./project.js";

export const ProjectManager = (function() {
    let projects = [];

    function addProject(project) {
        projects.push(project);
    }

    function getProjects() {
        return projects;
    }

    return {
        addProject,
        getProjects
    };
})(); 