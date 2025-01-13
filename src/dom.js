import Task from './task.js';
import Project from './project.js';
import { getProjectList, addProject, removeProject, removeTask } from './project.js';

localStorage.clear();

const projectList = getProjectList();

export function addNewTask() {
    const form = document.querySelector('#task-form');
    const dialog = document.querySelector('#task-modal');
    const addTask = document.querySelector('#add-task');

    const submitBtn = document.querySelector('#submit');
    const editBtn = document.querySelector('#edit');

    const newSubmitBtn = submitBtn.cloneNode(true);
    editBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    addTask.addEventListener('click', () => {
        newSubmitBtn.style.display = `block`;
        editBtn.style.display = 'none';

        // set default date to current day
        const dateInput = document.querySelector('#due');
        dateInput.valueAsDate = new Date();

        createProjectDropdown();

        dialog.showModal();
    });

    newSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const newTaskData = {
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,
            priority: document.querySelector('#set-priority').value,
            project: document.querySelector('#set-project').value,
            date: document.querySelector('#due').value,
        };


        if (newTaskData.title) {
            const task = new Task(
                newTaskData.title,
                newTaskData.description,
                newTaskData.date,
                newTaskData.priority,
                newTaskData.project
            );

            const projectArr = projectList[newTaskData.project];

            projectArr.push(task);

            saveUpdatedProjectList();

            // update display of current tab
            displayTabContent(getCurrentTab());

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
        const deleteBtn = document.createElement('div');

        titleEle.setAttribute('data', index);

        const projectName = projectArr[0].project;

        titleEle.addEventListener('click', () => expandTask(projectName, index));
        deleteBtn.addEventListener('click', () => {
            removeTask(projectList, projectName, index);

            saveUpdatedProjectList();

            displayTabContent(getCurrentTab());
        });

        addedTask.style.cssText = 'display: flex; justify-content: space-between; padding: 25px;';

        titleEle.textContent = task.title;
        deleteBtn.textContent = 'x';

        // console.log(JSON.parse(localStorage.getItem("projectList")));

        addedTask.appendChild(titleEle);
        addedTask.appendChild(deleteBtn);
        taskList.appendChild(addedTask);
    });
}

function expandTask(projectName, taskIndex) {
    const dialog = document.querySelector('#task-modal');
    const form = document.querySelector('#task-form');
    const editBtn = document.querySelector('#edit');
    const submitBtn = document.querySelector('#submit');

    // clear previous event listeners
    const newEditBtn = editBtn.cloneNode(true);
    editBtn.parentNode.replaceChild(newEditBtn, editBtn);

    // hide submitBtn
    submitBtn.style.display = `none`;
    newEditBtn.style.display = `block`;

    const formFields = {
        title: document.querySelector('#title'),
        description: document.querySelector('#description'),
        priority: document.querySelector('#set-priority'),
        project: document.querySelector('#set-project'),
        date: document.querySelector('#due'),
    };

    const task = projectList[projectName][taskIndex];

    const taskData = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        project: projectName,
        date: task.date,
    }

    // set initial form values
    Object.keys(formFields).forEach(key => {
        formFields[key].value = taskData[key];
    });

    dialog.showModal();

    newEditBtn.addEventListener('click', (e) => {
        editTask(e, taskData, taskIndex);
    });
}

function editTask(event, oldData, taskIndex) {
    event.preventDefault();

    const form = document.querySelector('#task-form');
    const dialog = document.querySelector('#task-modal');

    // get edited form inputs
    const newData = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        priority: document.querySelector('#set-priority').value,
        project: document.querySelector('#set-project').value,
        date: document.querySelector('#due').value,
    };

    const oldProjectArr = projectList[oldData.project];

    if (newData.project !== oldData.project) {

        // remove from old project
        removeTask(projectList, oldData.project, taskIndex);

        // add to new project
        const task = new Task(
            newData.title,
            newData.description,
            newData.date,
            newData.priority,
            newData.project
        );

        const newProjectArr = projectList[newData.project];
        newProjectArr.push(task);

    } else {
        const task = oldProjectArr[taskIndex];

        // update task with new info
        Object.keys(task).forEach(key => {
            task[key] = newData[key];
        });
    }

    saveUpdatedProjectList();

    // update display 
    displayTabContent(getCurrentTab());

    form.reset();
    dialog.close();
}

function saveUpdatedProjectList() {
    localStorage.clear();
    localStorage.setItem('projectList', JSON.stringify(projectList));
}

export function displayTabContent(key) {
    const taskList = document.querySelector('#task-list');
    const heading = document.createElement('h2');
    heading.textContent = `${key}`;
    renderTask(projectList[key]);
    taskList.insertBefore(heading, taskList.firstChild);
}

function getCurrentTab() {
    const heading = document.querySelector('h2').textContent;
    return heading;
}

export function addNewProject() {
    const addBtn = document.querySelector('#add-project');
    const dialog = document.querySelector('#project-modal');
    const wrapper = document.querySelector('#project-modal-wrapper');
    const form = document.querySelector('#project-form');
    const enterBtn = document.querySelector('#enter');

    addBtn.addEventListener('click', () => {
        dialog.style.left = wrapper.offsetLeft + 'px';
        dialog.style.top = wrapper.offsetTop + 'px';
        dialog.showModal();
    });

    enterBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.querySelector('#new-project').value;

        if (name) {
            // update projectList
            addProject(projectList, name);
            saveUpdatedProjectList();

            // update form project dropdown
            createProjectDropdown();

            // update tab bar
            displayTabBar();

            form.reset();
            dialog.close();
        }
    });
}

export function displayTabBar() {
    const parent = document.querySelector('#project-list');
    parent.textContent = '';

    Object.keys(projectList).forEach(key => {
        const child = document.createElement('li');
        child.textContent = key;
        child.id = `${key}-tab`;
        child.addEventListener('click', () => displayTabContent(key));
        parent.appendChild(child);
    });
}

function createProjectDropdown() {
    const project = document.querySelector('#set-project');
    project.textContent = '';

    Object.keys(projectList).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        project.appendChild(option);
    });
}