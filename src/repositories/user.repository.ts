import { User } from '../models/user.model';
import { UserDoc } from '../types/dbmodel';
import Otp from '../models/otp.model';

export class UserRepository {
  constructor() {}

  async create(userData: Partial<UserDoc>) {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string) {
    if (!userId) return null;

    // return this.userModel.findById(userId).exec();
    return await User.findById(userId).exec();
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }

  async update(userId: any, updates: Partial<UserDoc>) {
    return await User.findByIdAndUpdate(userId, updates, { new: true }).exec();
  }

  async delete(userId: string) {
    await User.findByIdAndDelete(userId).exec();
    return;
  }

  async otpDelete(otpId: string) {
    await Otp.findByIdAndDelete(otpId).exec();
    return;
  }
}

export default UserRepository;
