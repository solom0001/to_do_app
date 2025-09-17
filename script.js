"use strict";
//Make a todo app
const userInput = document.querySelector("#input_felt");
const addButton = document.querySelector("#add_but");
const toDoPg = document.querySelector("#toDo_felt");
const donePg = document.querySelector("#done_felt");
//////confirm boxes
const confirmBox = document.querySelector("#confirmation_box");
const confirmBut = document.querySelector("#confirm");
const cancelBut = document.querySelector("#cancel");
const undoBox = document.querySelector("#undo_box");
const undoBut = document.querySelector("#undo");
// const cancelBut2 = document.querySelector("#cance2");
const deleteBut = document.querySelector("#delete");
const confButtCase = document.querySelector("#button_box");
const undoButtCase = document.querySelector("#button_box2");
const groupButtons = document.querySelector(".group_window");
///////////

let msg = "";
// The prototype for all todos:
let task = {
  id: 0,
  desc: "-unknown task-",
  //   number: "",
  isDone: false,
};

//when you open the app, you are met with a large window, with a side window right beside
//In the big window, there should be an input field at the bottom that allows for
//user to input text,evt no. felt
//Upon enter or pressing a button, a todo reminder should appear at the top.
//This reminder box should have a circle radio and a favorites star
//in the side panel should be a done and favourites groups, once a reminder is given
//this status, it should appear in that group.
//If done, it should dissappear from the to-do list.

/////////////////////////////////////////////////Model
//create necessary update that then reflects on the view

//sq:1
//update the todolist, that could have other tasks, and then make the view update accordingly

//sq:2
//update the window/view to remove the done task
//if there is a done window/view, update that to contain the new task

/////////////////////////////////////////////////View
//recieve the input from the user

//sq:1
//get the new task from the input felt upon an add button click
// after model update, update the todo list options.

//sq:2
//After entering a new task, clear the input felt
//When a task gets marked done, open a confirmation window
//if the user decides to confirm, the task should disappear from to-do list and enter another,else
//they choose cancel and that whole event is ignored

let toDos = [];
let doneArr = [];

window.addEventListener("DOMContentLoaded", () => {
  toDos = JSON.parse(localStorage.getItem("toDo_tasks")) || [];
  doneArr = JSON.parse(localStorage.getItem("done_tasks")) || [];
  updateToList();

  start();
});

function start() {
  addButton.addEventListener("click", addObject);
  //group button handling
  groupButtons.addEventListener("click", (event) => {
    if (event.target.id === "group2") {
      document.querySelector("#group2").classList.add("activated");
      document.querySelector("#group1").classList.remove("activated");
      document.querySelector(".done_list").classList.remove("hidden");
      document.querySelector(".todo_list").classList.add("hidden");
      document.querySelector(".input_box").classList.add("hidden");
      document.querySelector("#title").textContent = "Done list";
    } else if (event.target.id === "group1") {
      document.querySelector("#group1").classList.add("activated");
      document.querySelector("#group2").classList.remove("activated");
      document.querySelector(".todo_list").classList.remove("hidden");
      document.querySelector(".done_list").classList.add("hidden");
      document.querySelector(".input_box").classList.remove("hidden");
      document.querySelector("#title").textContent = "To-Do list";
    }
    updateToList();
  });
  toDoPg.addEventListener("change", (event) => {
    if (event.target.tagName === "INPUT") {
      const todoId = event.target.value; //target kun den id/todo der er blevet changed
      markAsDone(todoId);
    }
  }); // here id like to set 1 even listener on the entire form, and use target for the individual radio inputs.

  donePg.addEventListener("change", (event) => {
    if (event.target.tagName === "INPUT") {
      const todoId = event.target.value; //target kun den id/todo der er blevet changed
      markAsUnDone(todoId);
    }
  }); // here id like to set 1 even listener on the entire form, and use target for the individual radio inputs.
}
function addObject() {
  const newTask = prepareObject();
  toDos.push(newTask);
  localStorage.setItem("toDo_tasks", JSON.stringify(toDos));

  //   console.log("toDo's:", toDos);
  updateToList();
}
function markAsDone(id) {
  //go into the array and get the object that has been marked
  //assign(push) the object to a ney array
  //print thi new array.
  //input: element from radio id   output:new done array
  const task = toDos.find((elm) => elm.id === id);
  if (task) {
    //show confrim box
    confirmBox.classList.remove("hidden");
    // task.isDone = true;

    const handler = (event) => {
      if (event.target.id === "confirm") {
        task.isDone = true;

        doneArr.push(task);
        toDos = toDos.filter((task) => task.id !== id);
        //update local storage.

        // console.log("Done tasks:", doneArr);
      } else if (event.target.id === "cancel") {
      } else if (event.target.id === "delete1") {
        toDos = toDos.filter((task) => task.id !== id);
      }
      localStorage.setItem("toDo_tasks", JSON.stringify(toDos)); //update local storage.
      localStorage.setItem("done_tasks", JSON.stringify(doneArr));
      updateToList();

      confirmBox.classList.add("hidden");
      confButtCase.removeEventListener("click", handler);
    };
    confButtCase.addEventListener("click", handler);
  }

  //   doneArr = toDos.filter((elm) => elm.isDone === true);
}
function markAsUnDone(id) {
  const task = doneArr.find((elm) => elm.id === id);
  if (task) {
    undoBox.classList.remove("hidden");

    const handler = (event) => {
      if (event.target.id === "undo") {
        task.isDone = false;

        toDos.push(task);
        doneArr = doneArr.filter((task) => task.id !== id);
        //update local storage.

        // console.log("Done tasks:", doneArr);
      } else if (event.target.id === "cancel2") {
      } else if (event.target.id === "delete") {
        doneArr = doneArr.filter((task) => task.id !== id);
      }
      localStorage.setItem("toDo_tasks", JSON.stringify(toDos)); //update local storage.
      localStorage.setItem("done_tasks", JSON.stringify(doneArr));
      updateToList();

      undoBox.classList.add("hidden");
      undoButtCase.removeEventListener("click", handler);
    };
    undoButtCase.addEventListener("click", handler);
  }
}

// function confirmTaskStat() {
//   //ask user whether user would like to add to done or not
//   //   let userChoice;
//   //   switch (expression) {
//   //     case x:
//   //       // code block
//   //       break;
//   //     case y:
//   //       // code block
//   //       break;
//   //     default:
//   //     // code block
//   //   }

//   confButtCase.addEventListener("click", (event) => {
//     if (event.target.id === "confirm") {
//       task.isDone = true;
//     } else if (event.target.id === "cancel") {
//     }
//   });
// }

function prepareObject() {
  msg = userInput.value; //I save the input at a variable for manipulation

  if (!msg) return null; //I return nothing if nothings been entered in felt
  //   const uuid = self.crypto.randomUUID();
  const list = Object.create(task);
  list.id = self.crypto.randomUUID();
  list.desc = msg;
  list.isDone = false;
  userInput.value = ""; //clear input fter value is registered

  return list;
}

function updateToList() {
  toDoPg.innerHTML = "";
  //   const storedToDos = JSON.parse(localStorage.getItem("toDo_tasks")) || [];
  //   console.log("storedTodos:", storedToDos);
  //   let myArray = addObject();
  //   myArray

  toDos.forEach((elm) => {
    toDoPg.innerHTML += `
    <input type="radio" id="${elm.id}" value="${elm.id}">
    <label for="${elm.id}">${elm.desc}</label><br>`;
  });

  //once the ToDo array has been updated, update the the radio list to include the new task

  // Update the done list
  donePg.innerHTML = "";
  doneArr.forEach((elm) => {
    donePg.innerHTML += `
      <input type="radio" id="${elm.id}" value="${elm.id}">
      <label for="${elm.id}">${elm.desc}</label><br>`;
  });
}

/////////////////////////////////////////////////Controller
//register the new input/item and adds it to the relevant list

//sq:1
//save this  task in an organised list, maybe a todolist

//sq:2
//Upon change to done, the list, its object should be removed from toDo array
//it should then be saved under a new list/array, a done list
