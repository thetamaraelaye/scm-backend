import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UserSignup, UserLogin } from '../types/user';

const userService = new UserService(); // initialise a new instance of the user service

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserSignup = req.body;
    const user = await userService.signup(userData);
    res.status(201).json({
      status: 201,
      success: true,
      user,
      message: 'User created successfully',
    });
  } catch (error) {
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
    res.status(200).json({ response: 'success', token: 'token', user: credentials });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
