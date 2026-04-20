function addTask(columnId) {
  let text = prompt("Enter task:");
  if (!text) return;

  let task = createTaskElement(text);
  document.querySelector(`#${columnId} .task-list`).appendChild(task);

  saveData();
}

function createTaskElement(text) {
  let task = document.createElement("div");
  task.className = "task";
  task.innerText = text;
  task.draggable = true;

  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
    saveData();
  });

  return task;
}

document.querySelectorAll(".task-list").forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    column.appendChild(dragging);
  });
});

function saveData() {
  let data = {};
  document.querySelectorAll(".column").forEach(col => {
    let colId = col.id;
    data[colId] = [];

    col.querySelectorAll(".task").forEach(task => {
      data[colId].push(task.innerText);
    });
  });

  localStorage.setItem("kanbanData", JSON.stringify(data));
}

function loadData() {
  let data = JSON.parse(localStorage.getItem("kanbanData"));
  if (!data) return;

  for (let col in data) {
    let column = document.querySelector(`#${col} .task-list`);
    data[col].forEach(text => {
      column.appendChild(createTaskElement(text));
    });
  }
}

loadData();
