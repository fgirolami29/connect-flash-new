/**
 * 💬 Middleware opzionale per gestire i messaggi flash via res.locals.
 *
 * Attivabile con la variabile d'ambiente:
 *   FLASH_PREVIEW_FEATURE=true
 *
 * Inietta `req.session.flash` in `res.locals.sessionFlash` e lo svuota.
 */

function flashMessages(req, res, next) {
  if (process.env.FLASH_PREVIEW_FEATURE !== 'true') {
    return next();
  }

  if (req.session?.flash) {
    res.locals.sessionFlash = req.session.flash;
    req.session.flash = {};
  } else if (req.session && !req.session.flash) {
    req.session.flash = {};
  }

  next();
}

module.exports = {flashMessages};