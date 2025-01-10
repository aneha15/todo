import Task from './task.js';
import Project from './project.js';
import { projectList } from './project.js';


export default function addNewTask() {
    const form = document.querySelector('form');
    const dialog = document.querySelector('dialog');
    const addTask = document.querySelector('#add-task');
    const taskModal = document.querySelector('#task-modal');
    const submitBtn = document.querySelector('#submit');

    addTask.addEventListener('click', () => {
        taskModal.showModal();
    });

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const priority = document.querySelector('#set-priority').value;
        const projectName = document.querySelector('#set-project').value;
        const date = document.querySelector('#due').value;

        const task = new Task(title, description, date, priority);
        const project = projectList[projectName];

        project.push(task);
         renderTask(project);
        //  console.log(task);
        // console.log(project);
        //  console.log(projectList);

        form.reset();
        dialog.close();
    });
}

function renderTask(project) {
    const taskList = document.querySelector('#task-list');
    taskList.textContent = '';

    project.forEach((task) => {
        console.log(task);
        const addedTask = document.createElement('div');
        const titleEle = document.createElement('div');
        const priorityEle = document.createElement('button');


        addedTask.style.cssText = 'display: flex; justify-content: space-between; padding: 25px;';
        priorityEle.style.backgroundColor = 'pink';

        titleEle.textContent = task.title;
        priorityEle.textContent = task.priority;

        addedTask.appendChild(titleEle);
        addedTask.appendChild(priorityEle);
        taskList.appendChild(addedTask);
    });
}

