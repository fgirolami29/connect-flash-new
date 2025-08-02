/**
 * 🔧 Wrapper helper per inizializzare cookie-parser + flash in modo sicuro
 * 
 * @param {Express.Application} app - istanza di express
 * @param {string} [secret] - chiave di sessione (opzionale, fallback su process.env.SESSION_SECRET)
 */
function safeFlashInit(app, secret) {
  if (!app) throw new Error("Express app is required.");
  const cookieParser = require('cookie-parser');
  const flash = require('./flash');

  const sessionSecret = secret || process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.warn("[CodeCorn][FlashInit] Nessuna SESSION_SECRET trovata.");
  }

  app.use(cookieParser(sessionSecret));
  app.use(flash());
}

module.exports = { safeFlashInit };