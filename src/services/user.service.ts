import { emailRegex, passwordRegex } from '../constants/db.constant';
import { UserRepository } from '../repositories/user.repository'; // UserRepository from "../repositories/user.repository";
import { UserLogin, UserSignup } from '../types/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { UserDoc } from '../models/user.model';

const userModelInstance: Model<UserDoc> = User;
const userRepo = new UserRepository(userModelInstance);

export class UserService {
  async signup(userSignupDto: UserSignup) {
    try {
      const { email, firstName, lastName, password } = userSignupDto;

      // Validation check
      if (!email || !emailRegex.test(email)) {
        throw new Error('A valid email address is required');
      }

      if (!password || !passwordRegex.test(password)) {
        throw new Error('A valid and strong password is required');
      }

      if (!firstName || !lastName) {
        throw new Error('Both firstname and lastname are required');
      }

      // Check if user exist
      const userRecord = await userRepo.findByEmail(email);
      if (userRecord) {
        throw new Error('User already exist');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const { password: pwd, ...storeUserRecordResult } = await userRepo.create({
        ...userSignupDto,
        password: hashedPassword,
      });
      return storeUserRecordResult;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(userSigninDto: UserLogin) {
    try {
      const { email, password } = userSigninDto;

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
