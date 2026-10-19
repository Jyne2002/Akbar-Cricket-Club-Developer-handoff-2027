# Hostinger production deployment

The repository root runs one Express application. It serves the Vite build from `frontend/dist` and all existing API routes under `/api`, using the same HTTPS domain and session cookies. Frontend API calls already use relative `/api/...` URLs, so no frontend API URL or `VITE_*` secrets are needed.

## Exact hPanel settings

In the existing Node.js Web App for `cricket.akbar.com`, open **Settings & Redeploy** and use:

| Setting | Value |
| --- | --- |
| Repository | `Jyne2002/Akbar-Cricket-Club-Developer-handoff-2027` |
| Branch | The branch containing these deployment changes |
| Root directory | `.` (repository root; select `/` if hPanel represents the repository root that way) |
| Framework | **Express.js** |
| Node.js version | **24.x** |
| Package manager | **npm** |
| Install command, if editable | `npm ci` |
| Build command | `npm run build` |
| Start command, if editable | `npm start` |
| Entry file | `backend/server.js` |
| Output directory, if required | `.` (keep the complete Express application and `frontend/dist` together) |
| Domain | `cricket.akbar.com` with SSL enabled |

The root `postinstall` automatically installs backend dependencies from `backend/package-lock.json` and frontend build dependencies from `frontend/package-lock.json`. Vite is explicitly installed even when `NODE_ENV=production`. The build only compiles the frontend; it does not connect to the database or seed data. Express serves the generated `frontend/dist`; do not configure this application as a frontend-only Vite deployment.

These settings follow Hostinger's [Node.js deployment guide](https://www.hostinger.com/tutorials/deploy-node-js-application/) and [supported frameworks and deployment settings](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

## Environment variables

Set these in **hPanel -> Environment Variables** before redeploying. Copy the existing production values through the dashboard; never place secrets in Git, frontend code, or screenshots.

| Variable | Production value |
| --- | --- |
| `NODE_ENV` | `production` |
| `APP_ORIGIN` | `https://cricket.akbar.com` |
| `MONGODB_URI` | Existing Atlas connection string, including the exact existing database name and authentication options |
| `ALLOW_EMBEDDED_DB` | `false` (also prevents local fallback during development) |
| `SEED_ON_STARTUP` | `false` (prevents startup seeding during development too) |
| `MONGODB_DNS_SERVERS` | Optional: `1.1.1.1,8.8.8.8` if Atlas SRV lookups fail; configured locally to resolve the current Windows DNS issue |
| `JWT_SECRET` | Existing secure secret of at least 32 characters; generate one if this is the first deployment |
| `FIELD_ENCRYPTION_KEY` | Existing 64-character hexadecimal encryption key; keep it exactly the same for existing encrypted records |
| `PORT` | Leave Hostinger's supplied value in place; the application reads it and binds to `0.0.0.0` |
| `UPLOADS_DIR` | Absolute persistent uploads directory outside Hostinger's managed build/output folders, if file uploads are in use |
| `OPENAI_API_KEY` | Optional existing key; omit to keep the built-in rules assistant |
| `OPENAI_MODEL` | Optional existing model selection |

`ADMIN_EMAIL` and `ADMIN_PASSWORD` are development-only and are not needed in production. Production seeding is disabled even if these variables remain configured. Local `backend/.env` loading is retained for development; hPanel variables take precedence. `.env` and `.env.*` files are ignored, while the placeholder-only `.env.example` remains tracked.

If generating a new JWT secret for a first deployment, run this locally and paste its output directly into hPanel:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

The same command can generate an encryption key only for a new database. Replacing an encryption key for existing records prevents decryption. Replacing a JWT secret signs out current sessions.

## MongoDB Atlas and existing records

The local `backend/.env` now selects the Atlas cluster's `akbar_cricket` database. Its actual URI is kept only in that ignored file. Set Hostinger's `MONGODB_URI` to the same value through hPanel; local `.env` edits are not deployed by Git.

Run the read-only connection check from the repository root:

```sh
npm run db:check
```

This checks connectivity, the selected database, and whether collections already exist. It never seeds data or writes records, collections, or indexes.

On this computer, Node's default DNS resolver refused Atlas SRV queries. The local `MONGODB_DNS_SERVERS` setting supplies working DNS resolvers for the Node process without changing Windows network settings. Hostinger normally uses its own DNS; configure this optional variable there only if needed.

Keep the current Atlas database name in `MONGODB_URI` and permit the actual Hostinger application's outbound IP address(es) in Atlas Network Access. Confirm the existing Atlas database user has the application's required permissions and its password is correctly URL-encoded in the URI.

Production stops if Atlas cannot connect. It never falls back to `backend/data/store.json`, creates seed data, or automatically creates collections/indexes. Do not import the local store over the existing Atlas database. If the previous deployment was using the embedded database, back up those records and plan an explicit migration before switching databases; deployment does not migrate them automatically.

## Existing account check

Automatic creation of default Administrator, Manager, and Coach credentials has been removed. Existing accounts are intentionally preserved.

Before deployment, run the read-only audit from an environment configured with the intended production `MONGODB_URI`:

```sh
npm run audit:accounts
```

The audit connects only to MongoDB, checks all users against the three formerly published demo passwords, reports affected account emails, and exits with status 1 if any are found. It never changes or deletes accounts or records. Change flagged passwords using the existing Settings flow and rerun the audit until it passes. Production must already contain an Administrator account; this deployment does not create one. Do not run the development seed script against production to provision accounts.

This source change prevents future unsafe seeding. It does not prove existing Atlas accounts are safe until the audit has run against that database.

## Local-data migration

The local data was migrated into Atlas database `akbar_cricket` on 19 October 2026:

| Records | Migrated count |
| --- | --- |
| Accounts | 3 |
| Players | 20 |
| Equipment | 58 |
| Sessions | 4 |
| Matches, inspections, damage reports, tasks | 0 |

All record identifiers, 80 attendance references, and existing timestamps were retained. Schema defaults were added for fields the embedded engine previously supplied at runtime. The three accounts used published demo passwords, so their Atlas passwords were replaced with secure generated passwords. Their email addresses and roles remain unchanged. Find the replacement logins in the Git-ignored `backend/.env.migration-credentials`; do not commit or publish that file. The original local store was not changed.

The ignored `backend/data/migration-backups/2026-10-19T17-38-36-758Z/` directory contains the original source, the prepared BSON-compatible migration snapshot, and counts/checksum metadata. The migration inserted all records in one transaction, then compared every imported document with the prepared snapshot. No uploaded files existed locally.

The reusable migration command defaults to a read-only dry run:

```sh
npm run db:migrate -- --dry-run
```

`--apply` explicitly performs the import, creates schema indexes, and writes a local backup before inserting records. It refuses any destination database that already contains records, so do not rerun it against the migrated database. The password audit and connection check remain safe to rerun.

Hostinger must still use the same Atlas URI and existing encryption key through its environment-variable settings; editing local `.env` files does not change hPanel.

## Upload persistence

Hostinger replaces managed build directories during redeployment. If users have already uploaded scorecards or photos, back up the existing upload directory before redeploying and point `UPLOADS_DIR` to a persistent absolute directory supported by your hosting account. Retain original filenames because database records refer to them. Confirm the application can read and write that directory. Relative `UPLOADS_DIR` values resolve from `backend/` regardless of the working directory. If no value is configured, uploads default to `backend/uploads` inside the application, which is unsuitable for retaining new uploads across fresh deployments.

## Build and verify

From the repository root:

```sh
npm ci
npm run build
npm test
```

The test suite uses temporary databases and randomly generated test credentials; it does not connect to Atlas or modify `backend/data/store.json`. Deployment tests verify frontend HTML, nested SPA paths, JS/CSS assets, JSON API errors, proxy behavior, production configuration, PORT handling, disabled seeding, and MongoDB connection failures. The existing suite verifies authentication, RBAC, encryption, cricket formulas, inventory, and assistant suggestions.

After making the reviewed source changes available to Hostinger and redeploying, verify:

1. `https://cricket.akbar.com/` displays the existing login screen and loads its assets.
2. `https://cricket.akbar.com/api/health` returns JSON with `status: "ok"`.
3. `https://cricket.akbar.com/api/does-not-exist` returns a JSON API error, never frontend HTML.
4. A direct request to `/players` serves the SPA shell. Existing navigation continues using its hash routes such as `/#/players`.
5. Sign in with an existing account, confirm expected club data, refresh a page, and confirm authenticated downloads work. Login records the existing last-login timestamp as usual.
6. Confirm previously uploaded files still open from their authenticated `/api/uploads/...` URLs.

No hPanel settings or live deployment are changed by editing the repository. Do not commit `.env`, credentials, runtime data, or generated `frontend/dist` files.
