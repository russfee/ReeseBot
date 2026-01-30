# Railway Deployment Guide

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository connected

## Step-by-Step Deployment

### 1. Create Railway Project

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select **russfee/ReeseBot**
4. Railway will automatically detect it as a Node.js project

### 2. Set Environment Variables

In your Railway project dashboard:
1. Go to **Variables** tab
2. Add these variables (click **+ New Variable** for each):

```
RESEND_API_KEY=re_your_actual_key_here
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=attendance@schoolemail.edu
STUDENT_NAME=Student Full Name
PARENT_NAME=Your Name
SEND_DAYS=monday,tuesday,wednesday,thursday,friday
```

**Important:** Use your actual values, not the examples above!

### 3. Configure Cron Schedule

#### Option A: Using Railway Cron (Recommended)

1. In Railway dashboard, go to your service
2. Click **Settings**
3. Find **Cron Schedule** section
4. Add a new cron job:
   - **Schedule:** `0 14 * * 1-5` (6 AM Pacific = 2 PM UTC during standard time)
   - **Command:** `npm start`

**Note:** Railway uses UTC time. Pacific Time conversions:
- 6 AM PST (Nov-Mar) = 2 PM UTC → `0 14 * * 1-5`
- 6 AM PDT (Mar-Nov) = 1 PM UTC → `0 13 * * 1-5`

⚠️ **Daylight Saving Time:** You'll need to update the cron schedule twice a year when DST changes, OR see Option B below.

#### Option B: Using TZ Environment Variable

If Railway supports timezone environment variables:
1. Add this variable: `TZ=America/Los_Angeles`
2. Use cron: `0 6 * * 1-5` (6 AM in specified timezone)

This handles DST automatically.

### 4. Deploy

1. Railway will auto-deploy when you push to GitHub
2. Or click **Deploy** button in Railway dashboard

### 5. Verify Deployment

1. Check **Deployments** tab - ensure build succeeded
2. Check **Logs** tab for any errors
3. Manually trigger a test:
   - Go to **Settings** → **Cron**
   - Click **Trigger Now** to test

### 6. Monitor

- **View logs:** Railway dashboard → Logs tab
- **Test locally first:** Run `npm run dev` to verify email sends
- **Check Resend dashboard:** Verify emails are being sent

## Cron Schedule Reference

Format: `minute hour day-of-month month day-of-week`

Examples:
- `0 6 * * 1-5` - 6 AM, Monday-Friday
- `0 14 * * 1-5` - 2 PM UTC (6 AM PST), Monday-Friday
- `30 7 * * *` - 7:30 AM, every day

Day-of-week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday

## Troubleshooting

### Email not sending
- Check Railway logs for errors
- Verify environment variables are set correctly
- Test locally: `npm run dev`
- Check Resend dashboard for API errors

### Wrong time
- Verify timezone conversion (Pacific to UTC)
- Check if DST is active
- Consider using TZ environment variable

### Build fails
- Check Railway build logs
- Ensure package.json has correct dependencies
- Verify Node.js version compatibility

## Important Notes

- Railway free tier includes cron jobs
- Emails send only on configured days (SEND_DAYS)
- Script checks day-of-week at runtime
- Keep .env file local (never commit it!)
- Monitor Resend usage (100 emails/day on free tier)
