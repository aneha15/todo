export default class Project {

    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }
}

export const projectList = {
    personal: [],
    work: [],
    groceries: [],
};

export function addProject(name) {
    projectList[name] = [];
}

export function removeTask(project, index) {
    projectList[project].splice(index, 1);
}