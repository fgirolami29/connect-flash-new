const express = require('express');
const session = require('express-session');
const request = require('supertest');
const { safeFlashInit } = require('../lib/helpers');

describe('safeFlashInit', () => {
    it('should initialize flash and cookie-parser', async () => {
        const app = express();
        process.env.SESSION_SECRET = 'secret123';
        app.use(session({ secret: 'secret123', resave: false, saveUninitialized: true }));
        safeFlashInit(app);

        app.get('/flash', (req, res) => {
            req.flash('info', 'safe init works');
            res.send(req.flash('info'));
        });

        const res = await request(app).get('/flash');
        expect(res.text).toContain('safe init works');
    });
});
