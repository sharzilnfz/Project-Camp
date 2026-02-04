import Mailgen from 'mailgen';

import nodemailer from 'nodemailer';

const sendMail = async (options) => {
  const { to, subject, content } = options;
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Camp',
      link: 'https://taskmanager.com/',
    },
  });

  const emailBody = mailGenerator.generatePlaintext(content);
  const emailHTML = mailGenerator.generate(content);
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_SMTP_HOST,
    port: process.env.MAIL_TRAP_SMTP_PORT,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: process.env.MAIL_TRAP_SMTP_USER,
      pass: process.env.MAIL_TRAP_SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: to,
      subject: subject,
      text: emailBody,
      html: emailHTML,
    });

    console.log('Message sent:', info.messageId);
  } catch (error) {
    console.log(error, 'error in sending mail');
  }
};

const emailVerificationMailContent = async (username, verifactionURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Camp! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Camp, please click here:',
        button: {
          color: '#00ccffff',
          text: 'Confirm your account',
          link: verifactionURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailContent = async (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro:
        'You recently requested to reset the password for your account. If you did not make this request, please ignore this email.',
      action: {
        instructions: 'To reset your password, please click here:',
        button: {
          color: '#ff0000ff',
          text: 'Reset your password',
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationMailContent, forgotPasswordMailContent, sendMail };
