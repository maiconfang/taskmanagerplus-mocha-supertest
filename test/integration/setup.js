import request from 'supertest';
import { API_BASE_URL } from '../../config.js';
import { expect } from 'chai';


export let authToken;

before(async function() {
    const res = await request(API_BASE_URL)
        .post('/oauth/token')
        .type('form')
        .send({
            username: 'luna.moon@maif.com',
            password: '123',
            grant_type: 'password',
        })
        .auth('maif-web', 'web123')  // Basic Auth
        .expect(200);
    
    authToken = res.body.access_token;
});
