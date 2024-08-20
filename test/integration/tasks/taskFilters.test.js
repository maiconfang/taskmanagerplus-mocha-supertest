import request from 'supertest';
import { expect } from 'chai';
import { authToken } from '../setup.js';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../../config.js';

describe('Task Filter by Description Tests', function() {
    // Test to filter tasks by description with pagination
    it.skip('should filter tasks by description and apply pagination', async function() {
        const description = 'Description for Task 2';
        const page = 0;
        const size = 2;

        const res = await request(API_BASE_URL)
            .get('/v1/tasks')
            .query({ description, page, size })
            .set('Authorization', `Bearer ${authToken}`)
            .set(DEFAULT_HEADERS)
            .expect(200)
            .expect('Content-Type', /json/);

        // Ensure the response contains an array of tasks
        expect(res.body._embedded.tasks).to.be.an('array');
        expect(res.body._embedded.tasks).to.have.length.of.at.most(size);

        // Validate that all returned tasks contain the specified description
        res.body._embedded.tasks.forEach(task => {
            expect(task.description).to.equal(description);
        });

        // Ensure pagination metadata is present and correct
        expect(res.body.page).to.have.property('size', size);
        expect(res.body.page).to.have.property('number', page);
    });
});
