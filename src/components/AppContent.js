import React from "react";
import { useSelector } from "react-redux";
import ToDoItem from "./ToDoItem";

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedToDoList = [...todoList];
  sortedToDoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  return (
    <div>
      {sortedToDoList && sortedToDoList.length > 0
        ? sortedToDoList.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
        : ""}
    </div>
  );
}

export default AppContent;
