export interface UserSignup {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    date_of_birth: string;
    email: string;
    password: string;
    confirm_password: string;
    account_name: string;
    bank_name: string;
    account_number: string;
    bvn: string;
  }


  
  export interface UserLogin {
    email: string;
    password: string;
  }