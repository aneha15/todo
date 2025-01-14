export default class Task {
  constructor(title, description, date, priority, project) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.project = project;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  // toggleChecked() {
  //     this.checked = this.checked === false ? true : false;
  // }

  setProject(project) {
    this.project = project;
  }
}
