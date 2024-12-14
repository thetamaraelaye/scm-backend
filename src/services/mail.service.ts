// import nodemailer from 'nodemailer';
// import { MailInterface, SmtpOptions } from '../types/user';

// export default class MailService {
//   private static instance: MailService;
//   private transporter!: nodemailer.Transporter;

//   private constructor() {}
//   //INSTANCE CREATE FOR MAIL
//   static getInstance() {
//     if (!MailService.instance) {
//       MailService.instance = new MailService();
//     }
//     return MailService.instance;
//   }
//   //CREATE CONNECTION FOR LOCAL
//   async createLocalConnection() {
//     let testAccount = await nodemailer.createTestAccount();
//     this.transporter = nodemailer.createTransport({
//       host: testAccount.smtp.host,
//       port: testAccount.smtp.port,
//       secure: testAccount.smtp.secure,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });
//   }
//   //CREATE A CONNECTION FOR LIVE
//   async createConnection() {
//     const options: SmtpOptions = {
//       host: process.env.SMTP_HOST || '',
//       port: parseInt(process.env.SMTP_PORT || '587'),
//       secure: process.env.SMTP_TLS === 'yes' ? true : false,
//       auth: {
//         user: process.env.SMTP_USERNAME || '',
//         pass: process.env.SMTP_PASSWORD || '',
//       },
//     };
//     this.transporter = nodemailer.createTransport(options);
//   }
//   //SEND MAIL
//   async sendMail(requestId: string | number | string[], options: MailInterface) {
//     return await this.transporter
//       .sendMail({
//         from: `"Project SCM" ${process.env.SMTP_SENDER || options.from}`,
//         to: options.to,
//         cc: options.cc,
//         bcc: options.bcc,
//         subject: options.subject,
//         text: options.text,
//         html: options.html,
//       })
//       .then((info) => {
//         console.log(`${requestId} - Mail sent successfully!!`);
//         console.log(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
//         if (process.env.NODE_ENV === 'local') {
//           console.log(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(info)}`);
//         }
//         return info;
//       });
//   }
//   //VERIFY CONNECTION
//   async verifyConnection() {
//     return this.transporter.verify();
//   }
//   //CREATE TRANSPORTER
//   getTransporter() {
//     return this.transporter;
//   }
// }
import nodemailer from 'nodemailer';
import { MailInterface, SmtpOptions } from '../types/user';

export default class MailService {
  private static instance: MailService;
  private transporter!: nodemailer.Transporter;

  private constructor() {
    // Synchronously initialize the transporter
    this.createTransporter();
  }

  //INSTANCE CREATE FOR MAIL
  static getInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  //CREATE TRANSPORTER
  private createTransporter() {
    if (!this.transporter) {
      if (
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USERNAME &&
        process.env.SMTP_PASSWORD
      ) {
        const options: SmtpOptions = {
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          // secure: process.env.SMTP_TLS === 'yes' ? false: true,
          auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
          },
        };
        this.transporter = nodemailer.createTransport(options);
      } else {
        throw new Error('SMTP configuration is missing or incomplete');
      }
    }
  }

  //SEND MAIL
  async sendMail(requestId: string | number | string[], options: MailInterface) {
    try {
      if (!this.transporter) {
        throw new Error('Mail transporter is not initialized');
      }
      const info = await this.transporter.sendMail({
        from: `"Project SCM" ${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
      console.log(`${requestId} - Mail sent successfully!!`);
      console.log(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
      if (process.env.NODE_ENV === 'local') {
        console.log(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
      return info;
    } catch (error) {
      console.error('Error sending mail:', error);
      throw error;
    }
  }

  //VERIFY CONNECTION
  async verifyConnection() {
    if (!this.transporter) {
      throw new Error('Mail transporter is not initialized');
    }
    return this.transporter.verify();
  }
}
