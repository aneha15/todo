import Task from './task.js';
import Project from './project.js';
import { projectList, addToProjectList } from './project.js';

export default function addNewTask() {
    addNewProject();
    const form = document.querySelector('#task-form');
    const dialog = document.querySelector('#task-modal');
    const addTask = document.querySelector('#add-task');
    const submitBtn = document.querySelector('#submit');

    addTask.addEventListener('click', () => {
        dialog.showModal();
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const priority = document.querySelector('#set-priority').value;
        const projectName = document.querySelector('#set-project').value;
        const date = document.querySelector('#due').value;

        if (title) {
            const task = new Task(title, description, date, priority, projectName);

            const project = projectList[projectName];

            project.push(task);

            tabSwitch();
            form.reset();
            dialog.close();
        }
    });
}

function renderTask(projectArr) {
    const taskList = document.querySelector('#task-list');
    taskList.textContent = '';
   
    projectArr.forEach((task, index) => {
        const addedTask = document.createElement('div');
        const titleEle = document.createElement('div');
        const priorityEle = document.createElement('button');

        addedTask.setAttribute('data', index);

        const projectName = projectArr[0].project;
        
        addedTask.addEventListener('click', function (e) {
            const dialog = document.querySelector('#task-modal');
            const form = document.querySelector('#task-form');
            const taskIndex = index;

            const titleEl = document.querySelector('#title');
            const descriptionEl = document.querySelector('#description');
            const priorityEl = document.querySelector('#set-priority');
            const projectEl = document.querySelector('#set-project');
            const dateEl = document.querySelector('#due');

            const task = projectList[projectName][taskIndex];
   

            const titleText = task.title;
            const descriptionText = task.description;
            const priorityText = task.priority;
            const projectText = task.project;
            const dateText = task.dueDate;

            titleEl.value = titleText;
            descriptionEl.value = descriptionText;
            priorityEl.value = priorityText;
            projectEl.value = projectText;
            dateEl.value = dateText;

            dialog.showModal();
        });

        addedTask.style.cssText = 'display: flex; justify-content: space-between; padding: 25px;';
        priorityEle.style.backgroundColor = 'pink';

        titleEle.textContent = task.title;
        priorityEle.textContent = task.priority;

        addedTask.appendChild(titleEle);
        addedTask.appendChild(priorityEle);
        taskList.appendChild(addedTask);
    });
}

// function expandTask(event, projectName) {
//     const dialog = document.querySelector('#task-modal');
//     const form = document.querySelector('#task-form');
//     const taskIndex = event.target.data;

//     console.log(taskIndex);
//     console.log(projectList[projectName]);

//    const titleText = projectList[projectName][taskIndex][title];
//    console.log(titleText);
//     dialog.showModal();
// }

function tabSwitch() {

    Object.keys(projectList).forEach(key => {

        const id = `${key}-tab`;
        const tab = document.getElementById(id);

        tab.addEventListener('click', () => {
            const taskList = document.querySelector('#task-list');
            const heading = document.createElement('h2');
            heading.textContent = `${key}`;
            renderTask(projectList[key]);
            taskList.insertBefore(heading, taskList.firstChild);
        });
    });
}

function addNewProject() {
    const projectTabs = document.querySelector('#projects');
    const addBtn = document.querySelector('#add-project');
    const dialog = document.querySelector('#project-modal');
    const wrapper = document.querySelector('#project-modal-wrapper');
    const form = document.querySelector('#project-form');
    const enterBtn = document.querySelector('#enter');
    const projectDropdown = document.querySelector('#set-project');

    addBtn.addEventListener('click', () => {
        dialog.style.left = wrapper.offsetLeft + 'px';
        dialog.style.top = wrapper.offsetTop + 'px';
        dialog.showModal();
    });

    enterBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.querySelector('#new-project').value;

        if (name) {
            const newProject = document.createElement('li');
            newProject.id = `${name}-tab`;
            newProject.textContent = String(name).charAt(0).toUpperCase() + String(name).slice(1);
            projectTabs.insertBefore(newProject, addBtn);

            const option = document.createElement('option');
            option.value = name;
            option.textContent = newProject.textContent;
            projectDropdown.appendChild(option);

            addToProjectList(name);

            form.reset();
            dialog.close();
        }
    });





}
