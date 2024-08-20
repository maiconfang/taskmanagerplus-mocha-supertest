// taskUpdate.test.js
import request from 'supertest';
import { expect } from 'chai';
import { authToken } from '../setup.js';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../../config.js';
import { createTask, deleteTaskById } from './taskUtils.js';

describe('Task Update Tests', function() {
    let taskId;

    // Setup: Create a task before the test
    before(async function() {
        const newTask = {
            title: 'Task to be updated',
            description: 'This task will be updated in the test',
            dueDate: '2024-07-10',
            completed: false
        };

        const createdTask = await createTask(authToken, newTask);
        taskId = createdTask.id; // Store the created task ID for later use
    });

    // Test to update an existing task
    it('should update an existing task successfully', async function() {
        const updatedTask = {
            id: taskId,  // Use the task ID created in the before hook
            title: 'Updated Title',
            description: 'Updated Description for Task',
            dueDate: '2024-07-15',
            completed: true
        };

        const res = await request(API_BASE_URL)
            .put(`/v1/tasks/${updatedTask.id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .set(DEFAULT_HEADERS)
            .send(updatedTask)
            .expect(200);  // Expect the status code to be 200 (OK)

        // Validate the response structure and updated values
        expect(res.body.title).to.equal(updatedTask.title);
        expect(res.body.description).to.equal(updatedTask.description);
        expect(res.body.dueDate).to.equal(updatedTask.dueDate);
        expect(res.body.completed).to.equal(updatedTask.completed);
    });

    // Cleanup: Delete the updated task after the test
    after(async function() {
        if (taskId) {
            await deleteTaskById(authToken, taskId);
        }
    });
});
