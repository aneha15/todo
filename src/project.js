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

function addToProjectList(name) {
    projectList.push(name);
}