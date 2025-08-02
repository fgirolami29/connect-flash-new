# 📦 Changelog — @codecorn/connect-flash-new

## [1.1.0-preview.1] - IN ARRIVO

### Added
- `lib/flashMessages.js`: middleware opzionale per injectare `res.locals.sessionFlash`
- Attivazione tramite `FLASH_PREVIEW_FEATURE=true` (via `.env` o process.env)

### Upcoming
- `lib/helpers.js`: init helper per cookie-parser + flash
- Supporto config programmatica in `connectFlash({ preview: true })`