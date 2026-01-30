import 'dotenv/config';
import { Resend } from 'resend';

// Validate and load environment variables
function getConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL;
  const studentName = process.env.STUDENT_NAME;

  if (!apiKey) {
    console.error('Error: RESEND_API_KEY environment variable is required');
    process.exit(1);
  }

  if (!toEmail) {
    console.error('Error: TO_EMAIL environment variable is required');
    process.exit(1);
  }

  if (!studentName) {
    console.error('Error: STUDENT_NAME environment variable is required');
    process.exit(1);
  }

  return {
    apiKey,
    toEmail,
    studentName,
    fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    parentName: process.env.PARENT_NAME || 'Parent/Guardian',
    sendDays: process.env.SEND_DAYS || 'monday,tuesday,wednesday,thursday,friday'
  };
}

const config = getConfig();

// Initialize Resend client
const resend = new Resend(config.apiKey);

// Check if today is a scheduled send day
function shouldSendToday(): boolean {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const sendDays = config.sendDays.toLowerCase().split(',').map(d => d.trim());

  const shouldSend = sendDays.includes(dayName);
  console.log(`Today is ${dayName}. Send days: ${sendDays.join(', ')}`);
  console.log(`Should send today: ${shouldSend}`);

  return shouldSend;
}

// Format the email content
function formatEmailContent(): { subject: string; html: string; text: string } {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const subject = `Spare Period Excuse - ${config.studentName} - ${dateString}`;

  const textContent = `Dear Attendance Office,

Please excuse ${config.studentName} from being on-site during her spare period today, ${dateString}.

Thank you,
${config.parentName}`;

  const htmlContent = `<p>Dear Attendance Office,</p>

<p>Please excuse ${config.studentName} from being on-site during her spare period today, ${dateString}.</p>

<p>Thank you,<br>
${config.parentName}</p>`;

  return {
    subject,
    html: htmlContent,
    text: textContent
  };
}

// Main function to send the email
async function sendExcuseEmail(): Promise<void> {
  try {
    // Check if we should send today
    if (!shouldSendToday()) {
      console.log('Not a scheduled send day. Skipping email.');
      return;
    }

    // Format email content
    const { subject, html, text } = formatEmailContent();

    console.log(`Sending email to ${config.toEmail}...`);
    console.log(`Subject: ${subject}`);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: config.fromEmail,
      to: config.toEmail,
      subject,
      html,
      text
    });

    if (error) {
      console.error('Error sending email:', error);
      process.exit(1);
    }

    console.log('Email sent successfully!');
    console.log('Email ID:', data?.id);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
sendExcuseEmail();
