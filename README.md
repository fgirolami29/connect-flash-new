# connect-flash-new

<div style="display: flex;align-items: center">
<div style="width:60%">

> A modern, type-safe, and fully compatible flash messaging middleware for Express.
> This project is a clean reimplementation of the original `connect-flash` — actively maintained by the community, for the community.

</div>
  <div style="width:40%">
    <p align="right">
      <a href="https://github.com/fgirolami29/connect-flash-new/stargazers">
        <img src="https://img.shields.io/github/stars/fgirolami29/connect-flash-new?style=social" alt="Star on GitHub">
      </a>
      <a href="https://www.npmjs.com/package/@codecorn/connect-flash-new">
        <img src="https://img.shields.io/npm/v/@codecorn/connect-flash-new" alt="npm version">
      </a>
      <a href="https://github.com/fgirolami29/connect-flash-new/issues">
        <img src="https://img.shields.io/github/issues/fgirolami29/connect-flash-new.svg" alt="open issues">
      </a>
      <a href="https://github.com/fgirolami29/connect-flash-new/actions">
        <img src="https://github.com/fgirolami29/connect-flash-new/actions/workflows/test.yml/badge.svg" alt="CI Status">
      </a>
      <a href="https://github.com/fgirolami29/connect-flash-new/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/fgirolami29/connect-flash-new.svg" alt="contributors">
      </a>
    </p>
  </div>
</div>

---

## ✨ Features

-   🔐 Safe flash message handling via session
-   🧠 TypeScript-ready (`.d.ts` included)
-   ♻️ Fully compatible with CommonJS (`require`) and ES Modules (`import`)
-   🧪 Easy to test (with `supertest`)
-   🔥 Drop-in replacement for deprecated `connect-flash`

---

## 📦 Installation

```bash
npm install @codecorn/connect-flash-new
```

---

## 🚀 Usage

```js
// ✅ ESM / TypeScript
import express from 'express';
import session from 'express-session';
import flash from '@codecorn/connect-flash-new';

// ✅ CommonJS (require)
const express = require('express');
const session = require('express-session');
const flash = require('@codecorn/connect-flash-new');

const app = express();

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());

app.get('/', (req, res) => {
    req.flash('info', 'Welcome back %s!', 'Federico');
    res.send(req.flash('info'));
});
```

---

## 🧪 Testing with Supertest

```js
// ✅ ESM
import request from 'supertest';
import express from 'express';
import session from 'express-session';
import flash from '@codecorn/connect-flash-new';

// ✅ CommonJS
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const flash = require('@codecorn/connect-flash-new');

const app = express();
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use(flash());

app.get('/test', (req, res) => {
    req.flash('info', 'Test Message');
    res.json({ messages: req.flash('info') });
});

test('should return flash message', async () => {
    const res = await request(app).get('/test');
    expect(res.body.messages).toContain('Test Message');
});
```

---

## 🔐 Safe Init Helper (Optional)

If you want a one-liner to safely initialize both `cookie-parser` and `connect-flash-new`, you can use our helper:

```js
const express = require('express');
const session = require('express-session');
const { safeFlashInit } = require('@codecorn/connect-flash-new/helpers');

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

safeFlashInit(app); // Will use process.env.SESSION_SECRET or throw a warning
```

---

## 🧪 Experimental: `flashMessages` Middleware (Preview)

In alternativa al classico `flash()`, puoi usare `flashMessages` per accedere ai messaggi flash direttamente in `res.locals.sessionFlash`.
Questa funzionalità è **opt-in** e può essere abilitata nel tuo `.env` o in modo programmatico:

```js
// lib/flashMessages.js
import { flashMessages } from '@codecorn/connect-flash-new';

app.use(flashMessages);
```

### 🔧 Attivazione condizionata via `.env`

Puoi attivarlo dinamicamente leggendo da `.env`:

```js
if (process.env.ENABLE_FLASH_MESSAGES === 'true') {
    app.use(flashMessages);
}
```

Questo middleware:

-   🔄 Passa i messaggi da `req.session.flash` a `res.locals.sessionFlash`
-   🧼 Svuota la sessione per evitare messaggi duplicati/zombie
-   🛡️ Inizializza `req.session.flash` se mancante

> ⚠️ In fase sperimentale — potrà evolvere con il feedback della community.

---

## 🙏 Credits

Originally inspired by [connect-flash](https://github.com/jaredhanson/connect-flash) by @jaredhanson.  
This project continues the spirit of the original package, updated for modern Node.js and TypeScript environments.

---

## 👤 Maintainer

<div style="display: flex; justify-content: space-between; align-items: center;"> 
  <div> 
    <p><strong>👨‍💻 Federico Girolami</strong></p> 
    <p><strong>Full Stack Developer</strong> | <strong>System Integrator</strong> | <strong>Digital Solution Architect</strong> 🚀</p> 
    <p>📫 <strong>Get in Touch</strong></p> 
    <p>🌐 <strong>Website</strong>: <a href="https://codecorn.it">codecorn.it</a> *(Under Construction)*</p> 
    <p>📧 <strong>Email</strong>: <a href="mailto:f.girolami@codecorn.it">f.girolami@codecorn.it</a></p> 
    <p>🐙 <strong>GitHub</strong>: <a href="https://github.com/fgirolami29">github.com/fgirolami29</a></p> 
  </div> 
  <div style="text-align: center;">
    <a href="https://www.codecorn.it"> 
      <img src="https://codecorn.it/wp-content/uploads/2025/05/CODECORN-trasp-qhite.png" alt="Code Corn Logo"  width="250px" height="90px" style="margin-top:30px;margin-bottom:20px;"/>
    </a> 
    <a href="https://github.com/fgirolami29"> 
      <img src="https://avatars.githubusercontent.com/u/68548715?s=200&v=4" alt="Federico Girolami Avatar" style="border-radius: 50%; width: 125px; height: 125px;border: 5px solid gold" /> 
    </a> 
  </div> 
</div>
