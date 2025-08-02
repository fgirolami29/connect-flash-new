const request = require('supertest');
const express = require('express');
const session = require('express-session');
const flash = require('../lib');

describe('connect-flash-new', () => {
  it('should store and retrieve flash messages', async () => {
    const app = express();
    app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
    app.use(flash());

    app.get('/set', (req, res) => {
      req.flash('info', 'message sent');
      res.end();
    });

    app.get('/get', (req, res) => {
      res.send(req.flash('info'));
    });

    const agent = request.agent(app);

    await agent.get('/set');
    const res = await agent.get('/get');
    expect(res.text).toContain('message sent');
  });
});