process.env.FLASH_PREVIEW_FEATURE = true;
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const flash = require('../lib/flash.js');
const { flashMessages } = require('../lib/flashMessages.js'); // ✅ Middleware opzionale

describe('connect-flash-new', () => {
  const buildApp = (usePreview = false) => {
    const app = express();
    app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
    app.use(flash());

    if (usePreview) {
      app.use(flashMessages); // ✅ Experimental Middleware
    }

    app.get('/set', (req, res) => {
      req.flash('info', 'message sent');
      res.end();
    });

    app.get('/get', (req, res) => {
      if (usePreview) {
        return res.json({ messages: res.locals.sessionFlash?.info || [] });
      }
      return res.send(req.flash('info'));
    });

    return app;
  };

  it('should store and retrieve flash messages (classic)', async () => {
    const app = buildApp(false);
    const agent = request.agent(app);

    await agent.get('/set');
    const res = await agent.get('/get');
    expect(res.text).toContain('message sent');
  });

  it('should store and retrieve flash messages (preview middleware)', async () => {
    const app = buildApp(true);
    const agent = request.agent(app);

    await agent.get('/set');
    const res = await agent.get('/get');

    expect(res.body.messages).toContain('message sent');
  });
});
