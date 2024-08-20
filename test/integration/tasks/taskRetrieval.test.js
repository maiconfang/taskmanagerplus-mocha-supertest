import request from 'supertest';
import { expect } from 'chai';
import { authToken } from '../setup.js';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../../config.js';

describe('Task Retrieval Tests', function() {
    // Test to retrieve a list of all tasks
    it.skip('should retrieve a list of tasks', async function() {
        const res = await request(API_BASE_URL)
            .get('/v1/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .set(DEFAULT_HEADERS)
            .expect(200);
        
        // Ensure the response contains an array of tasks
        expect(res.body._embedded.tasks).to.be.an('array');

        // Validate the structure of a task
        const task = res.body._embedded.tasks[0];
        expect(task).to.have.property('id');
        expect(task).to.have.property('title');
        expect(task).to.have.property('description');
        expect(task).to.have.property('dueDate');
        expect(task).to.have.property('completed');
        expect(task).to.have.property('_links');
        expect(task._links).to.have.property('self');
        expect(task._links.self).to.have.property('href');
    });

    // Test to retrieve tasks by title with pagination
    it.skip('should retrieve tasks by title with pagination', async function() {
        const title = 'Task 2';
        const page = 0;
        const size = 10;

        const res = await request(API_BASE_URL)
            .get('/v1/tasks')
            .query({ title, page, size })
            .set('Authorization', `Bearer ${authToken}`)
            .set(DEFAULT_HEADERS)
            .expect(200)
            .expect('Content-Type', /json/);

        // Ensure the response contains an array of tasks
        expect(res.body._embedded.tasks).to.be.an('array');
        expect(res.body._embedded.tasks).to.have.length.of.at.most(size);

        // Validate that all returned tasks have the specified title
        res.body._embedded.tasks.forEach(task => {
            expect(task.title).to.equal(title);
        });

        // Ensure pagination metadata is present and correct
        expect(res.body.page).to.have.property('size', size);
        expect(res.body.page).to.have.property('number', page);
    });


});
