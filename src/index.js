import "./style.css";
import { getProjectList } from './project.js';
import { addNewTask, addNewProject, displayTabBar, displayTabContent } from "./dom.js";

displayTabBar();
displayTabContent(Object.keys(getProjectList())[0]);
addNewTask();
addNewProject();
// tabSwitch();