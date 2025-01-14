const defaultProjectList = {
  personal: [
    {
      title: "shower before bed",
      description: "",
      date: "2025-01-13",
      priority: "medium",
      project: "personal",
    },
    {
      title: "call old sis",
      description: "",
      date: "2025-01-13",
      priority: "medium",
      project: "personal",
    },
    {
      title: "learn webpack",
      description: "",
      date: "2025-01-13",
      priority: "high",
      project: "personal",
    },
    {
      title: "exercise for 10 mins",
      description: "",
      date: "2025-01-13",
      priority: "high",
      project: "personal",
    },
    {
      title: "make a study plan",
      description:
        "make a detailed study plan to make sure this month is a success",
      date: "2025-01-18",
      priority: "high",
      project: "personal",
    },
  ],
  work: [
    {
      title: "make weather app",
      description: "",
      date: "2025-01-23",
      priority: "high",
      project: "work",
    },
    {
      title: "submit salary file",
      description: "",
      date: "2025-01-14",
      priority: "high",
      project: "work",
    },
    {
      title: "call HR",
      description: "",
      date: "2025-01-17",
      priority: "high",
      project: "work",
    },
  ],
  groceries: [
    {
      title: "buy veggies",
      description: "",
      date: "2025-01-15",
      priority: "medium",
      project: "groceries",
    },
    {
      title: "buy biscuits",
      description: "",
      date: "2025-01-13",
      priority: "low",
      project: "groceries",
    },
    {
      title: "buy mayo",
      description: "",
      date: "2025-01-13",
      priority: "high",
      project: "groceries",
    },
  ],

  gym: [
    {
      title: "do cross trainer for 10 mins",
      description: "",
      date: "2025-01-14",
      priority: "medium",
      project: "gym",
    },
  ],
};

export function getProjectList() {
  if (localStorage.getItem("projectList")) {
    const projectList = JSON.parse(localStorage.getItem("projectList"));
    console.log("using local storage");
    return projectList;
  } 
    console.log("using default list");
    return defaultProjectList;
  
}

export function addProject(list, name) {
  list[name] = [];
}

export function removeProject(list, name) {
  delete list[name];
}

export function removeTask(list, project, index) {
  list[project].splice(index, 1);
}
