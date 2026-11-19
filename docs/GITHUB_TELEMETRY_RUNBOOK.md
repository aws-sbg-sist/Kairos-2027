# KAIROS 2027 — GitHub Commit Telemetry Runbook

**Technical Owner:** Shanmugapriyan, Chief Technology & Infrastructure Officer
**Endpoint:** `POST /api/v1/github/webhook`
**Public telemetry:** `GET /api/v1/github/webhook`

## 1. What the implementation records

For registered finalist repositories, the endpoint records a sanitized subset of GitHub push metadata:

- Team code and registered repository
- Branch name
- Commit SHA and short SHA
- Single-line commit message, limited to 240 characters
- Public commit-author display name
- Commit timestamp and webhook receipt timestamp
- Whether the commit occurred after the official code-freeze time

It does not store source-code diffs, patches, author email addresses or GitHub access tokens.

## 2. Security controls

- Every request must have a valid `X-Hub-Signature-256` HMAC signature.
- The repository must match a GitHub URL already registered to a KAIROS team.
- Delivery IDs and commit SHAs provide idempotent duplicate handling.
- Only `push` events are stored; other verified event types are acknowledged and ignored.
- Payloads larger than 2 MB are rejected.
- A maximum of 100 distinct commits is processed from one push delivery.
- The event store is bounded to the newest 10,000 commit records.

## 3. Environment configuration

Set these values in the production environment:

```env
GITHUB_WEBHOOK_SECRET=<high-entropy-random-secret>
GITHUB_COMMIT_FREEZE_AT=2027-01-24T12:15:00+05:30
```

Generate the secret using an approved password/secret manager. Do not place the real value in `.env.example`, screenshots, chat messages or Git history.

When the JSON development fallback is used, its data directory must use persistent storage:

```env
KAIROS_DATA_DIR=/var/data
```

Production should use the Supabase PostgreSQL driver and apply `20261119000007_github_commit_telemetry.sql`. Without persistent storage, JSON-fallback telemetry can disappear when the hosting service restarts.

## 4. GitHub repository setup

For every finalist repository:

1. Confirm its exact URL is stored in the corresponding team record.
2. Open the repository's **Settings → Webhooks → Add webhook** page.
3. Set the payload URL to `https://<production-domain>/api/v1/github/webhook`.
4. Set content type to `application/json`.
5. Enter the configured webhook secret.
6. Select **Just the push event**.
7. Enable the webhook.
8. Verify the GitHub ping delivery receives HTTP 200.
9. Push a test commit and verify it appears in the endpoint, leaderboard and stage view.

## 5. Operational checks

```text
GET /api/v1/github/webhook
```

The response contains:

- `source`: `github-webhook` or `awaiting-webhooks`
- `totalCommits`
- Per-team commit count, after-freeze count and last commit time
- The newest 20 sanitized commit events

The stage and leaderboard poll this endpoint every 15 seconds and retain their last verified snapshot during a temporary network error.

## 6. Code-freeze behavior

The telemetry service marks late commits with `afterFreeze: true`. It does not and cannot block a push inside a participant-owned GitHub repository.

Disqualification or score penalties must remain a human governance decision. The webhook evidence should be reviewed alongside GitHub's repository history and the published event rules.

## 7. Incident response

| Symptom | Check | Response |
|---|---|---|
| HTTP 401 | Signature or secret mismatch | Re-enter the production secret in GitHub and hosting environment |
| HTTP 404 | Repository is not registered | Correct the team's `githubUrl` record |
| HTTP 503 | No server-side secret | Configure `GITHUB_WEBHOOK_SECRET` and restart deployment |
| Duplicate count increases | GitHub redelivery | No action required; duplicate commits are not stored twice |
| No stage updates | Public GET endpoint or browser polling | Check application logs, endpoint response and selected persistence driver |
| Telemetry disappears after restart | JSON fallback has a non-persistent data path | Use Supabase in production, or mount persistent storage and set `KAIROS_DATA_DIR` |

## 8. Production limitation

The Supabase PostgreSQL driver supports shared telemetry storage for multiple application instances after the migration is applied. The guarded JSON fallback is suitable only for controlled single-instance development and must not be used for horizontally scaled production replicas.
