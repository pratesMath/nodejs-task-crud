<h1 align="center">NodeJS Task CRUD</h1>

## Introduction

This is a Node.js API to perform full task management (CRUD). Essential features include task creation, listing with title and description filters, updating, deleting, and marking tasks as completed. The key differentiator of this project is the implementation of a bulk task import routine from a CSV file using the `csv-parse` library.

**Challenge**: Use pure Node.js to develop the server (without using any frameworks like Express, Fastify, or NestJS).

## Instructions

Project structure, rules, and requirements:

The challenge consists of creating a Node.js API to manage tasks. The primary objective is to apply the concepts of CRUD (Create, Read, Update, Delete) and file manipulation.

## Task Structure

Each task must be composed of the following properties:

- `id`: A unique identifier for each task
- `title`: The title of the task
- `description`: A detailed description of the task
- `completed_at`: The completion date of the task, which must initially be set to null
- `created_at`: The creation date of the task
- `updated_at`: The date of the last update to the task, which must change with every modification

## Route Rules

The API must include the following routes and business rules:

### POST /tasks

Creates a new task.

Receives title and description inside the request body.

The fields id, created_at, updated_at, and completed_at must be automatically populated.

### GET /tasks

Lists all existing tasks.

Allows searching for tasks by filtering through the title and description fields.

### PUT /tasks/:id

Updates a specific task by its id.

Receives title and/or description in the request body for the update.

Before updating, it must validate whether the provided id corresponds to an existing task.

### DELETE /tasks/:id

Removes a specific task by its id.

Before removing, it must validate whether the provided id corresponds to an existing task.

### PATCH /tasks/:id/complete

Toggles the task status between completed and not completed, modifying the completed_at field.

Before updating, it must validate whether the provided id corresponds to an existing task.

## What about the CSV import?

Normally in an API, importing a CSV happens by sending the file through a route using another format called `multipart/form-data`. Since this challenge aims to keep the implementation simple, you can fulfill this functionality using a separate script file, such as import-csv.js.

To do this, use the csv-parse library along with the async iterator example pattern.

Once the library is installed using your preferred package manager, create a separate file to handle reading the CSV file.

In this file, the CSV should be read line by line, and for each line, a request should be made to the POST - /tasks route, passing the necessary fields.

Recommended CSV format:

```CSV
title,description
Task 01,Description for Task 01
Task 02,Description for Task 02
Task 03,Description for Task 03
Task 04,Description for Task 04
Task 05,Description for Task 05
```

## Implementation Recommendation

Similar to what was done in the stream-http-server.js file during classes using for await, you can also achieve this with the parse function from the library mentioned above. (Remember to skip the first line/header of the CSV file).

## Going Beyond

Some suggestions on additional features that can be implemented:

Validate if the title and description properties for the POST and PUT routes are present in the request body.

For routes that receive /:id, in addition to validating whether the id exists in the database, return the request with a message stating that the record does not exist.

## Tasks Checklist

Use this checklist to help organize your submission:

- [ ] Develop the POST /tasks route to create a new task
- [ ] Develop the GET /tasks route to list all tasks
- [ ] Implement search functionality by title and description in the GET /tasks route
- [ ] Develop the PUT /tasks/:id route to update a task
- [ ] Add existence validation for the id in the PUT /tasks/:id route
- [ ] Develop the DELETE /tasks/:id route to remove a task
- [ ] Add existence validation for the id in the DELETE /tasks/:id route
- [ ] Develop the PATCH /tasks/:id/complete route to mark a task as completed/pending
- [ ] Add existence validation for the id in the PATCH /tasks/:id/complete route
- [ ] Create a separate script for task import
- [ ] Use the csv-parse library to read the CSV file
- [ ] Implement the logic to send a request to POST /tasks for each line of the CSV inside the import script

<br>
<div align="center">
  <h2>Thanks 2 everyone!</h2>
  <p>Made w/ 💙 by <a href="https://github.com/pratesMath">pratesMath</a>.</p>
</div>
