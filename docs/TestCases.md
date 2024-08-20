# Test Cases for Task Manager Plus API

## 1. Test Case: Create a New Task

**Test Case ID:** TC01

**Test Name:** Create a New Task Successfully

**Objective:** Verify that a new task can be created successfully in the Task Manager Plus API.

**Preconditions:** The API server must be running, and a valid authentication token must be available.

**Test Steps:**
1. Send a POST request to the endpoint `/v1/tasks` with the following task data:
   - Title: "Test Maicon Fang - Mocha Supertest"
   - Description: "Test Description for Task-1"
   - Due Date: "2024-06-30"
   - Completed: false
2. Verify the response status code is `201 Created`.
3. Verify the response contains the following fields with correct values:
   - `id`: The unique identifier of the created task.
   - `title`: "Test Maicon Fang - Mocha Supertest"
   - `description`: "Test Description for Task-1"
   - `dueDate`: "2024-06-30"
   - `completed`: false
4. Verify the response contains a self-link in the `_links.self.href` field.

**Expected Result:** The task is created successfully, and the response contains the correct details.

---

## 2. Test Case: Update an Existing Task

**Test Case ID:** TC02

**Test Name:** Update an Existing Task Successfully

**Objective:** Verify that an existing task can be updated successfully in the Task Manager Plus API.

**Preconditions:** 
- The API server must be running, and a valid authentication token must be available.
- A task must be created beforehand to perform the update.

**Test Steps:**
1. Use the `createTask` utility to create a task with the following data:
   - Title: "Task to be updated"
   - Description: "This task will be updated in the test"
   - Due Date: "2024-07-10"
   - Completed: false
2. Send a PUT request to the endpoint `/v1/tasks/{taskId}` (where `{taskId}` is the ID of the created task) with the following updated data:
   - Title: "Updated Title"
   - Description: "Updated Description for Task"
   - Due Date: "2024-07-15"
   - Completed: true
3. Verify the response status code is `200 OK`.
4. Verify the response contains the updated fields with correct values:
   - `title`: "Updated Title"
   - `description`: "Updated Description for Task"
   - `dueDate`: "2024-07-15"
   - `completed`: true

**Expected Result:** The task is updated successfully, and the response contains the correct updated details.

---

## 3. Test Case: Delete an Existing Task

**Test Case ID:** TC03

**Test Name:** Delete an Existing Task Successfully

**Objective:** Verify that an existing task can be deleted successfully in the Task Manager Plus API.

**Preconditions:** 
- The API server must be running, and a valid authentication token must be available.
- A task must be created beforehand to perform the deletion.

**Test Steps:**
1. Use the `createTask` utility to create a task with the following data:
   - Title: "Task to be deleted"
   - Description: "This task will be deleted in the test"
   - Due Date: "2024-07-15"
   - Completed: true
2. Send a DELETE request to the endpoint `/v1/tasks/{taskId}` (where `{taskId}` is the ID of the created task).
3. Verify the response status code is `204 No Content`.
4. Send a GET request to the endpoint `/v1/tasks/{taskId}` to verify the task has been deleted.
5. Verify the response status code is `404 Not Found`.

**Expected Result:** The task is deleted successfully, and subsequent attempts to retrieve the task return a `404 Not Found` status.

---

**Note:** The `after` hook in each test ensures that the environment is cleaned up by deleting the tasks created during the test, preventing data accumulation.

