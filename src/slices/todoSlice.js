import { createSlice } from "@reduxjs/toolkit";

const getInitialToDos = () => {
  const localToDoList = window.localStorage.getItem("todoList");
  if (localToDoList) {
    return JSON.parse(localToDoList);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const initialValue = {
  todoList: getInitialToDos(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    addToDo: (state, action) => {
      state.todoList.push(action.payload);
      const localToDoList = window.localStorage.getItem("todoList");
      if (localToDoList) {
        const localToDoListArr = JSON.parse(localToDoList);
        localToDoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem(
          "todoList",
          JSON.stringify(localToDoListArr)
        );
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
  },
});

export const { addToDo } = todoSlice.actions;
export default todoSlice.reducer;
