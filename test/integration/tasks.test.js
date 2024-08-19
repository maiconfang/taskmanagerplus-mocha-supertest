// test/integration/tasks.test.js

import request from 'supertest';
import { expect } from 'chai';

describe('Task API Integration Tests', function() {
    it('should return the correct Hello World! message with emojis', async function() {
        const res = await request('http://localhost:8080') // Certifique-se de que sua API Java está rodando nessa porta
            .get('/v1/tasks/helloJsonFormat')
            .expect(200)
            .expect('Content-Type', /json/);  // Verifica se o Content-Type é JSON

        // Verifica o conteúdo do JSON retornado
        expect(res.body.message).to.equal('Hii, Hello World! 🌍 (But let\'s be honest, the real world is full of bugs... 🐛)');
    });
});

