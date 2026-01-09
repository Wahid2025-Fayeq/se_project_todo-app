import TodoCounter from "../components/TodoCounter.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) =>
  new Todo(data, "#todo-template", {
    handleCheck: (completed) => {
      todoCounter.updateCompleted(completed);
    },
    handleDelete: (completed) => {
      todoCounter.updateTotal(false);
      if (completed) {
        todoCounter.updateCompleted(false);
      }
    },
  }).getView();

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      section.addItem(generateTodo(item));
    },
  },
  ".todos__list"
);

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset()
    );
    const newTodoData = {
      name,
      date: adjustedDate,
      id: uuidv4(),
      completed: false,
    };
    initialTodos.push(newTodoData);
    const todoElement = generateTodo(newTodoData);

    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
