import { emailRegex, passwordRegex } from '../constants/db.constant';
import { UserRepository } from '../repositories/user.repository'; // UserRepository from "../repositories/user.repository";
import { UserLogin, UserSignup, verifyEmail } from '../types/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../helpers/handleError';
import { User } from '../models/user.model';
import { verifyOtp, generateOtp } from '../utils/otpGenerator';
import Otp, { OtpType } from '../models/otp.model';
import MailService from './mail.service';
import verifyEmailTemplate from '../templates/verifyEmail.template';

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

      //GENERATE OTP FOR MAIL VERIFICATION
      let tokenExpiration: any = new Date();
      tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 10);

      const otp: string = generateOtp(6);

      let newOtp = new Otp({
        userId: storeUserResult._id,
        type: OtpType.VERIFICATION,
        otp,
        otpExpiration: new Date(tokenExpiration),
      });
      await newOtp.save();
      //SEND VERIFICATION MAIL TO USER
      const emailTemplate = verifyEmailTemplate(otp, 'https://project-scm.vercel.app');
      const mailService = MailService.getInstance();
      await mailService.sendMail('', {
        to: storeUserResult.email,
        subject: 'Verify OTP',
        html: emailTemplate.html,
      });

      return storeUserResult;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(UserLogin: UserLogin) {
    try {
      const { email, password } = UserLogin;

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

  //verify email
  //   async verifyEmail(payload: verifyEmail) {
  //     try {
  //       const { email, otp } = payload;

  //        //IF USER NOT FOUND
  //       const userRecord = await userRepo.findByEmail(email);

  //       if (userRecord) {
  //         throw new BadRequestError('User already exist');
  //       }

  //      //VERIFYING OTP
  //       if (!otp) {
  //         throw new BadRequestError('OTP is required');
  //       }
  //        // If user is already verified

  //       if (userRecord.is_verified) {
  //         throw new BadRequestError('User email is already verified.');
  //       }
  //       //get user id by finding by ID
  //       const User = await userRepo.findById(userRecord._id);
  //     let isOtpValid = await verifyOtp(User._id, otp, OtpType.VERIFICATION);

  //     if (!isOtpValid) {
  //       throw new BadRequestError(
  //         'This OTP has Invalid.')
  //     }

  //     userRepo.update(User._id, { is_verified: true });
  //     user.is_verified = true;
  //     User.save();
  //     //DELETE OTP

  //     userRepo.otpDelete(isOtpValid);

  //   }
  // }
  async verifyEmail(payload: verifyEmail) {
    try {
      const { email, otp } = payload;

      // Find user by email
      const userRecord = await userRepo.findByEmail(email);

      // If user not found
      if (!userRecord) {
        throw new BadRequestError('User not found');
      }

      // If user is already verified
      if (userRecord.is_verified) {
        throw new BadRequestError('User email is already verified.');
      }

      // VERIFYING OTP
      if (!otp) {
        throw new BadRequestError('OTP is required');
      }

      // Verify OTP
      const isOtpValid = await verifyOtp(userRecord._id, otp, OtpType.VERIFICATION);

      if (!isOtpValid) {
        throw new BadRequestError('Invalid OTP');
      }

      // Update user's verification status
      await userRepo.update(userRecord._id, { is_verified: true });

      // Delete OTP
      await userRepo.otpDelete(isOtpValid);

      // Return success message or any other response as needed
      return 'Email verified successfully';
    } catch (error) {
      throw error;
    }
  }
}
