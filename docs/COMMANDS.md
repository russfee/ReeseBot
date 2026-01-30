# Commands

## Install
```bash
npm install
```

## Run Locally (Development)
```bash
# Create .env file first (copy from .env.example)
cp .env.example .env
# Edit .env with your actual values

# Run the script once
npm run dev
```

## Build
```bash
npm run build
```

## Run (Production)
```bash
npm start
```

## Type Check
```bash
npm run typecheck
```

## Railway Deployment

### Initial Setup
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize project: `railway init`
4. Set environment variables:
   ```bash
   railway variables set RESEND_API_KEY=your_key
   railway variables set TO_EMAIL=attendance@school.edu
   railway variables set STUDENT_NAME="Student Name"
   railway variables set PARENT_NAME="Parent Name"
   railway variables set SEND_DAYS=monday,tuesday,wednesday,thursday,friday
   ```

### Deploy
```bash
railway up
```

### Configure Cron Job
In Railway dashboard:
1. Go to your service settings
2. Add a Cron Job trigger
3. Set schedule: `0 7 * * 1-5` (7 AM weekdays)
4. Set command: `npm start`

### View Logs
```bash
railway logs
```
