# ReeseBot

Automated school excuse email system that sends daily spare period excuse emails.

## Overview

ReeseBot is a TypeScript application that automatically sends excuse emails to your niece's school, eliminating the need for manual emails each day. It uses Resend for email delivery and can be deployed to Railway for scheduled cron job execution.

## Features

- Automated daily email sending
- Configurable send schedule (specific days of the week)
- Professional email formatting
- Environment-based configuration
- Type-safe TypeScript implementation

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and fill in your details:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=attendance@school.edu
STUDENT_NAME=Student Full Name
PARENT_NAME=Parent/Guardian Name
SEND_DAYS=monday,tuesday,wednesday,thursday,friday
```

### 3. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy it to your `.env` file

### 4. Test Locally

Run the script once to test:

```bash
npm run dev
```

The script will check if today is a scheduled send day and send the email if appropriate.

## Deployment to Railway

### Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- Railway CLI installed: `npm i -g @railway/cli`

### Steps

1. **Login to Railway**
   ```bash
   railway login
   ```

2. **Initialize Project**
   ```bash
   railway init
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set RESEND_API_KEY=your_key_here
   railway variables set TO_EMAIL=attendance@school.edu
   railway variables set STUDENT_NAME="Student Name"
   railway variables set PARENT_NAME="Parent Name"
   railway variables set FROM_EMAIL=onboarding@resend.dev
   railway variables set SEND_DAYS=monday,tuesday,wednesday,thursday,friday
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Configure Cron Schedule**
   - Go to your Railway project dashboard
   - Navigate to your service settings
   - Add a Cron Job trigger
   - Set schedule: `0 7 * * 1-5` (7 AM on weekdays)
   - Set command: `npm start`

6. **View Logs**
   ```bash
   railway logs
   ```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `RESEND_API_KEY` | Yes | - | Your Resend API key |
| `TO_EMAIL` | Yes | - | School email address |
| `STUDENT_NAME` | Yes | - | Student's full name |
| `FROM_EMAIL` | No | `onboarding@resend.dev` | Sender email (use Resend verified domain) |
| `PARENT_NAME` | No | `Parent/Guardian` | Parent/guardian name for signature |
| `SEND_DAYS` | No | `monday,tuesday,wednesday,thursday,friday` | Comma-separated days to send |

## Scripts

- `npm run dev` - Run locally with tsx (no build required)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript (for production)
- `npm run typecheck` - Check TypeScript types without building

## Project Structure

```
ReeseBot/
├── src/
│   └── index.ts          # Main email script
├── dist/                 # Compiled JavaScript (generated)
├── docs/                 # Project documentation
│   ├── COMMANDS.md       # Build and run commands
│   ├── DECISIONS.md      # Architecture decisions
│   ├── PLAN.md           # Implementation plan
│   └── SESSION_CONTEXT.md # Project context
├── package.json
├── tsconfig.json
├── railway.json          # Railway configuration
├── .env.example          # Environment variable template
└── README.md
```

## How It Works

1. Script runs on a schedule (via Railway cron or manual trigger)
2. Checks if today is one of the configured send days
3. If yes, formats and sends an excuse email via Resend
4. Logs success or failure

## Troubleshooting

### Email not sending

- Verify `RESEND_API_KEY` is correct
- Check that `TO_EMAIL` is valid
- Ensure today is in `SEND_DAYS` list
- Check Railway logs for errors

### Resend API errors

- Verify your API key is active
- Check you haven't exceeded free tier (100 emails/day)
- For custom sender domains, verify domain is configured in Resend

### Cron job not running

- Verify cron schedule syntax in Railway dashboard
- Check Railway service is not paused
- View logs to see if script is executing

## Development

Built with:
- TypeScript 5.7
- Node.js (ES2022 modules)
- Resend email API
- Railway for deployment

## License

ISC
