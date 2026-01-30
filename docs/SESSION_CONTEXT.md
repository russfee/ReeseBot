# Session Context

## Session updates
- 2026-01-29: Created implementation plan for ReeseBot. See docs/PLAN.md for full details.
- 2026-01-22: Updated AGENTS.md paths to use docs/* and remove ProjectTemplate references.

## What this repo is
A TypeScript application that automatically sends a daily excuse email to a school for spare period attendance, eliminating the need for manual emails each day.

## Current goal
Implement the core email script with Resend integration and Railway deployment configuration.

## Where to look first
- `src/index.ts` - Main email script
- `docs/PLAN.md` - Full implementation plan
- `.env.example` - Required environment variables
- `railway.json` - Deployment configuration

## Known issues / risks
- Requires Resend API key and verified sender domain
- Railway cron job needs correct timezone configuration
- School email address must be accurate

## How to validate
1. Set up `.env` with test email address
2. Run `npm run dev` locally
3. Verify email received
4. Deploy to Railway and trigger manual run
