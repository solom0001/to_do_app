"use strict";
//Make a todo app
const userInput = document.querySelector("#input_felt");
const addButton = document.querySelector("#add_but");
const toDOpg = document.querySelector("#toDo_felt");
let msg = "";
// The prototype for all todos:
let task = {
  id: 0,
  desc: "-unknown animal-",
  //   number: "",
  //   isDone: 0,
};

//when you open the app, you are met with a large window, with a side window right beside
//In the big window, there should be an input field at the bottom that allows for
//user to input text,evt no. felt
//Upon enter or pressing a button, a todo reminder should appear at the top.
//This reminder box should have a circle radio and a favorites star
//in the side panel should be a done and favourites groups, once a reminder is given
//this status, it should appear in that group.
//If done, it should dissappear from the to-do list.

//Model
//create necessary update that then reflects on the view

//sq:1
//update the todolist, that could have other tasks, and then make the view update accordingly

//View
//recieve the input from the user
// let msg = userInput;

let toDos = [];

window.addEventListener("DOMContentLoaded", start);

function start() {
  addButton.addEventListener("click", updateToList);
}
function addObject() {
  const newTask = prepareObject();
  toDos.push(newTask);
  console.log("toDo's:", toDos);
  return toDos;
}

function prepareObject() {
  msg = userInput.value;
  if (!msg) return null;
  //   const uuid = self.crypto.randomUUID();
  const list = Object.create(task);
  list.id = self.crypto.randomUUID();
  list.desc = msg;
  return list;
}

function updateToList() {
  toDOpg.innerHTML = "";
  let myArray = addObject();
  myArray.forEach((elm) => {
    toDOpg.innerHTML += `
    <input type="radio" id="${elm.id}" value="HTML">
    <label for="td_list">${elm.desc}</label><br>`;
  });

  //once the ToDo array has been updated, update the the radio list to include the new task
}
//sq:1
//get the new task from the input felt upon an add button click
// after model update, update the todo list options.

//Controller
//register the new input/item and adds it to the relevant list

//sq:1
//save this  task in an organised list, maybe a todolist
