import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ViewTodo } from "./components/todo/view";
import { AddTodo } from "./components/todo/add";

function App() {
  return (
    <div className="min-h-screen flex-col items-center justify-center mx-10 my-10">
      <div className="flex items-center justify-between mb-7 mx-2">
        <h1 className="text-2xl font-bold ">My List To-Do</h1>
        <AddTodo />
      </div>
      <ViewTodo />
    </div>
  );
}

export default App;
