const { format } = require('util');

/**
 * Middleware generator
 */
function flash(options = {}) {
  const safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.flash && safe) return next();
    req.flash = flashFunction;
    next();
  };
}

/**
 * `req.flash()` implementation
 */
function flashFunction(type, msg) {
  if (!this.session) {
    throw new Error('req.flash() requires sessions');
  }

  const msgs = (this.session.flash = this.session.flash || {});

  if (type && msg) {
    if (arguments.length > 2) {
      msg = format(...Array.from(arguments).slice(1));
    } else if (Array.isArray(msg)) {
      (msgs[type] = msgs[type] || []).push(...msg);
      return msgs[type].length;
    }
    return (msgs[type] = msgs[type] || []).push(msg);
  }

  if (type) {
    const val = msgs[type] || [];
    delete msgs[type];
    return val;
  }

  this.session.flash = {};
  return msgs;
}

module.exports = flash;
