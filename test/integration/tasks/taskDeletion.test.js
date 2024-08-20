// taskCreation.test.js
import request from 'supertest';
import { expect } from 'chai';
import { authToken } from '../setup.js';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../../config.js';
import { deleteTaskById } from './taskUtils.js';

describe('Task Creation Tests', function() {
    let createdTaskId;

    // Test to create a new task
    it('should create a new task successfully', async function() {
        const newTask = {
            title: 'Test Maicon Fang - Mocha Supertest',
            description: 'Test Description for Task-1',
            dueDate: '2024-06-30',
            completed: false
        };

        const res = await request(API_BASE_URL)
            .post('/v1/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .set(DEFAULT_HEADERS)
            .send(newTask)
            .expect(201)  // Expect the status code to be 201 (Created)
            .expect('Content-Type', /json/);

        // Validate the response structure
        expect(res.body).to.have.property('id');
        expect(res.body.title).to.equal(newTask.title);
        expect(res.body.description).to.equal(newTask.description);
        expect(res.body.dueDate).to.equal(newTask.dueDate);
        expect(res.body.completed).to.equal(newTask.completed);

        // Store the created task ID for later use
        createdTaskId = res.body.id;

        // Verify the self-link in the response
        expect(res.body._links).to.have.property('self');
        expect(res.body._links.self).to.have.property('href');
    });

    // Cleanup: Delete the created task after the test
    after(async function() {
        if (createdTaskId) {
            await deleteTaskById(authToken, createdTaskId);
        }
    });
});
