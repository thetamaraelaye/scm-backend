import { UserRole } from "../models/user.model";

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
  account_number: string;
  bvn: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
