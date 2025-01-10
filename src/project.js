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

export function addToProjectList(name) {
    projectList[name] = [];
    // console.log(projectList);
}