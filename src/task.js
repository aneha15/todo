
export default class Task {
    constructor(title, description, dueDate, priority, checked=false, project='personal') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
        this.project = project;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    toggleChecked() {
        this.checked = this.checked === false ? true : false;
    }

    setProject(project) {
        this.project = project;
    }
}



