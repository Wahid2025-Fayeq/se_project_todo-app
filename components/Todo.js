class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxElement.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    this._todoDeleteButton.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _generateCheckBoxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameElement = this._todoElement.querySelector(".todo__name");
    const todoDateElement = this._todoElement.querySelector(".todo__date");
    this._todoDeleteButton =
      this._todoElement.querySelector(".todo__delete-btn");

    todoNameElement.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDateElement.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckBoxElement();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
