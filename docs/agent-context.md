# Ash

See [`README.md`](../README.md) for what this project is and why it exists.

## Scope (current)

Practical driving exam only, categories A, A1, B, B1, C, C1, D, etc. Theory exam,
document services, or other talon types are explicitly out of scope for now — don't
build for them speculatively.

Not limited to one city or service center — the data source covers many, and the
app must support browsing/subscribing across all of them, not a single hardcoded
one.

## Product decisions already made

- **Data source**: talon availability comes from an external open/public data
  source. We'll likely mirror it into our own database so the app responds fast
  without hitting the external source on every request — not fully decided yet.
  The exact external endpoint/shape is not finalized in code — confirm before
  implementing the integration, don't assume a shape.
- **Subscription model**: a subscription is a (service center, category) pair. A
  user can hold multiple subscriptions at once.
- **Notification delivery**: via Telegram bot messages only. The Mini App itself
  does plain REST (fetch on screen open / pull-to-refresh) — no WebSocket. The
  "polling" that matters is the backend worker checking the external data source on
  an interval, not the frontend.
- **Dedup is required**: the worker must diff each check against the last known
  snapshot per (service center, category) and notify only about slots that are new
  since the last snapshot — never repeat a notification for the same slot.
- **Mini App navigation**: 3 bottom tabs — Browse/Search (category + service center
  picker, results, inline subscribe button), My subscriptions (list with live
  availability + unsubscribe), Profile (read-only Telegram user info: avatar, name,
  username, Premium badge — no settings for MVP).
- **i18n from day one**: even though only Ukrainian copy exists right now, don't
  hardcode strings — wire up an i18n setup from the start.
- **Visual style**: custom brand identity layered over the Telegram theme (must
  support Telegram light + dark), not the default Telegram look.

## Working conventions

- Explain non-obvious decisions instead of making them silently — but don't
  narrate the obvious, and favor reviewable, understandable code over clever
  one-liners.
- Build for production quality: proper testing, CI, sensible architecture, and
  real error handling, not shortcuts.
- Name types, functions, and files after the business domain (talon, service
  center, subscription, notification), not generic technical terms (data, item,
  handler, process).
- Keep this document updated as real product/architecture decisions get made — it's
  the thing that keeps a fresh session (or the other developer) from having to
  re-derive context that already exists in someone's head. `CLAUDE.md`, `AGENTS.md`,
  and Cursor's rules all point here — edit this file, not those.
- Don't make a call when the picture is incomplete. If a task is ambiguous,
  contradicts an earlier decision, or depends on information only a human has —
  stop and ask instead of guessing. If more than one reasonable interpretation
  exists, name them rather than silently picking one.
