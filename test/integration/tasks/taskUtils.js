// taskUtils.js
import request from 'supertest';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../../config.js';

/**
 * Deletes a task by its ID
 * @param {string} authToken - The authorization token
 * @param {number} taskId - The ID of the task to delete
 * @returns {Promise} - A promise that resolves when the task is deleted
 */
export async function deleteTaskById(authToken, taskId) {
    if (!taskId) {
        throw new Error('Task ID is required to delete a task');
    }

    const res = await request(API_BASE_URL)
        .delete(`/v1/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set(DEFAULT_HEADERS)
        .expect(204);  // Expect the status code to be 204 (No Content)

    return res;
}


/**
 * Creates a new task
 * @param {string} authToken - The authorization token
 * @param {object} taskData - The task data to create
 * @returns {Promise<object>} - A promise that resolves with the created task data
 */
export async function createTask(authToken, taskData) {
    if (!taskData) {
        throw new Error('Task data is required to create a task');
    }

    const res = await request(API_BASE_URL)
        .post('/v1/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .set(DEFAULT_HEADERS)
        .send(taskData)
        .expect(201)  // Expect the status code to be 201 (Created)
        .expect('Content-Type', /json/);

    return res.body;
}
