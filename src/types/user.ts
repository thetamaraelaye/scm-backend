import { UserRole } from '../models/user.model';

export interface UserSignup {
  first_name: string;
  last_name: string;
  dial_code: string;
  phone_number: string;
  date_of_birth: string;
  email: string;
  password: string;
  confirm_password: string;
  account_name: string;
  bank_name: string;
  role: UserRole;
  is_verified: boolean;
  account_number: string;
  bvn: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface verifyEmail {
  email: string;
  otp: string;
}
export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}

export interface SmtpOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
