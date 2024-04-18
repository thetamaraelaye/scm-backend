import { emailRegex, passwordRegex } from '../constants/db.constant';
import { UserRepository } from '../repositories/user.repository'; // UserRepository from "../repositories/user.repository";
import { UserLogin, UserSignup } from '../types/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../helpers/handleError';

const userRepo = new UserRepository();

export class UserService {
  constructor() {}
  async signup(UserSignup: UserSignup) {
    try {
      const { email, first_name, last_name, password } = UserSignup;

      // Validation check
      if (!email || !emailRegex.test(email)) {
        throw new BadRequestError('A valid email address is required');
      }

      if (!password || !passwordRegex.test(password)) {
        throw new BadRequestError('A valid and strong password is required');
      }

      if (!first_name || !last_name) {
        throw new BadRequestError('Both firstname and lastname are required');
      }

      // Check if user exist
      const userRecord = await userRepo.findByEmail(email);
      if (userRecord) {
        throw new BadRequestError('User already exist');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const storeUserRecordResult = await userRepo.create({
        ...UserSignup,
        password: hashedPassword,
      });
      const { password: pwd, ...storeUserResult } = storeUserRecordResult.toObject();
      return storeUserResult;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(UserLogin: UserLogin) {
    try {
      const { email, password } = UserLogin;

      console.log(email, password);
      // Validation check
      if (!email || !emailRegex.test(email)) {
        throw new Error('A valid email address is required');
      }

      if (!password) {
        throw new Error('Password is required');
      }

      // Check if user exist
      const userRecord = await userRepo.findByEmail(email);
      if (!userRecord) {
        throw new Error('User not found');
      }

      console.log(userRecord.password);
      // Compare password
      const isPasswordMatch = await bcrypt.compare(password, userRecord.password);

      if (!isPasswordMatch) {
        throw new Error('Invalid credentials');
      }

      const jwtUserPayload = {
        id: userRecord.id,
        email: userRecord.email,
        firstName: userRecord.first_name,
      };

      const accessToken = jwt.sign(jwtUserPayload, process.env.JWT_SECRET_KEY!, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }
}
