# Claude Code Instructions

- Always bump the patch version in index.html (`APP_VERSION` / `APP_RELEASED`), README.md, and CHANGELOG.md when making changes
- Add a dated entry to CHANGELOG.md for every index.html or worker.js change
- Update README.md's Features section if a change affects how the page behaves
- worker.js changes only take effect after `npx wrangler deploy`
- .gitignore is present — do not commit node_modules or other ignored files
- Version format is `vMAJOR.MINOR.PATCH` — bug fixes and cosmetic changes are PATCH only
