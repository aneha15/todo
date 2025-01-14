import "./style.css";
import { getProjectList } from "./project";
import {
  addNewTask,
  addNewProject,
  displayTabBar,
  displayTabContent,
  renderDateSortedList,
} from "./dom";

displayTabBar();
displayTabContent(getProjectList(), Object.keys(getProjectList())[0]);
renderDateSortedList();
addNewTask();
addNewProject();
