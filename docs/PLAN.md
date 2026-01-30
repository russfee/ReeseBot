# ReeseBot: Automated School Excuse Email System

## Overview
A TypeScript application that automatically sends a daily excuse email to your niece's school, eliminating the need for manual emails each day.

## Tech Stack
- **Language:** TypeScript + Node.js
- **Email Service:** Resend (free tier: 100 emails/day)
- **Deployment:** Railway (cron job)
- **Schedule:** Configurable via environment variables

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Railway   │────▶│   Script    │────▶│   Resend    │────▶ School Email
│  Cron Job   │     │  (index.ts) │     │    API      │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Implementation Plan

### 1. Project Setup
- Initialize Node.js project with TypeScript
- Install dependencies: `resend`, `typescript`, `tsx`
- Configure `tsconfig.json` for ES modules

**Files to create:**
- `package.json`
- `tsconfig.json`
- `.env.example`

### 2. Core Email Script
Create `src/index.ts` with:
- Load environment variables
- Check if today is a scheduled send day
- Send email via Resend API
- Log success/failure

**Environment variables:**
- `RESEND_API_KEY` - API key from resend.com
- `FROM_EMAIL` - Verified sender email (or use Resend's default)
- `TO_EMAIL` - School's email address
- `STUDENT_NAME` - Your niece's name
- `SEND_DAYS` - Comma-separated days (e.g., "monday,tuesday,wednesday,thursday,friday")

### 3. Email Template
Simple, professional email:
```
Subject: Spare Period Excuse - [Student Name] - [Date]

Dear Attendance Office,

Please excuse [Student Name] from being on-site during her spare period today, [Date].

Thank you,
[Parent Name]
```

### 4. Railway Deployment
- Create `railway.json` or configure via Railway dashboard
- Set up cron schedule (e.g., `0 7 * * 1-5` for 7 AM weekdays)
- Add environment variables in Railway dashboard

**Files to create:**
- `railway.json` (optional, can configure via dashboard)
- `Dockerfile` (optional, Railway auto-detects Node.js)

### 5. Documentation
Update project docs:
- `docs/COMMANDS.md` - Build and run commands
- `docs/SESSION_CONTEXT.md` - Project context
- `.gitignore` - Add node_modules, .env, dist

## File Structure (Final)
```
ReeseBot/
├── src/
│   └── index.ts          # Main email script
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── railway.json          # Railway config (optional)
└── docs/
    ├── COMMANDS.md
    ├── SESSION_CONTEXT.md
    ├── DECISIONS.md
    └── PLAN.md
```

## Verification Plan
1. **Local testing:** Run `npm run dev` with test email address
2. **Confirm Resend setup:** Check email delivered successfully
3. **Railway deployment:** Deploy and trigger manual run
4. **Schedule verification:** Confirm cron job runs at correct time

## Setup Steps (Post-Implementation)
1. Sign up at [resend.com](https://resend.com) and get API key
2. Verify sender domain (or use Resend's default `onboarding@resend.dev` for testing)
3. Deploy to Railway and set environment variables
4. Configure cron schedule in Railway dashboard
