import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UserSignup, UserLogin, verifyEmail } from '../types/user';
import { jsonOne } from '../utils/generalResponse';
import verifyEmailTemplate from '../templates/verifyEmail.template';
import MailService from '../services/mail.service';

const userService = new UserService(); // initialise a new instance of the user service

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserSignup = req.body;
    const user = await userService.signup(userData);

    res.status(201).json({
      status: 201,
      success: true,
      user,
      message: 'User created successfully, Please check your email to verify your account',
    });
  } catch (error) {
    console.error('Error during signup:', error);
    next(error);
    // console.error('Error signing up:', error);
    // res.status(500).json({ error: `An error occurred while signing up', ${error} ` });
    // // console the error to debug
    // console.log(error);
    throw error;
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials: UserLogin = req.body;
    const token = await userService.authenticate(credentials);
    res.status(200).json({
      response: 'User login successfully',
      status: 200,
      token,
      //user: credentials,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

//verify email
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: verifyEmail = req.body;

    await userService.verifyEmail(payload);
    res.status(200).json({
      status: 200,
    });
    //SENDING RESPONSE
    return jsonOne<string>(res, 200, 'Email Verification Successfull.');
  } catch (error) {
    next(error);
  }
};
