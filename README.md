# To-Do List App

A feature-rich To-Do List application built with ReactJS and TypeScript, styled with Tailwind CSS, and utilizing Zustand for state management with persistence.

---

## Project Setup

### Requirements

- Node.js
- npm

### Steps to Set Up

1. Clone the repository:
   git clone https://github.com/nainnasyuhada/todo-list-app.git
   cd todo-list-app

2. Install dependencies:
   npm install

3. Run the project:
   npm run start

4. Open your browser and navigate to:
   http://localhost:3000 


---

## About The Project

The To-Do List App helps users efficiently manage their tasks by adding, editing, and deleting to-dos with rich functionality and a user-friendly interface.

### Overview

The To-Do List App helps users efficiently manage their tasks by adding, editing, and deleting to-dos with rich functionality and a user-friendly interface.

### Key Technologies

- ReactJS with TypeScript: For building the app with strongly-typed components.
- Tailwind CSS: For styling the application with modern and responsive designs.
- Zustand: For state management due to its lightweight execution and persistent state functionality using local storage.
- React Hook Form: For managing and validating form inputs


---

## Features and Functionality

### Add To-Do

Users can create a new to-do by entering a title and description.

### View To-Do List

The to-do list is displayed in a table, showing:
Status, Title, Description, and Action buttons (Edit/Delete)

### View To-Do Details

Clicking on a to-do displays its full details, including:
Title, Description, Created Date-Time, Updated Date-Time, and Status

### Edit or Delete To-Dos

Editing and deleting are restricted to to-dos with the status “TO_DO” or “IN_PROGRESS”.

### Auto-Sorted To-Do List

The to-do list is automatically sorted by status:
	1.	TO_DO
	2.	IN_PROGRESS
	3.	COMPLETED
	4.	CANCELLED

### Table Pagination

The to-do list supports pagination, with a limit of 10 records displayed per page.
Navigation buttons allow users to view additional pages of to-dos.