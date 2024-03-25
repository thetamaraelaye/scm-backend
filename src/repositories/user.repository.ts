import { Model } from 'mongoose';
import { User, UserDoc } from '../models/user.model';

export class UserRepository {
  constructor(private userModel: Model<UserDoc>) {}

  async create(userData: Partial<UserDoc>): Promise<UserDoc> {
    try {
      return this.userModel.create(userData);
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string): Promise<UserDoc | null> {
    if (!userId) return null;

    // return this.userModel.findById(userId).exec();
    return this.userModel.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(userId: string, updates: Partial<UserDoc>): Promise<UserDoc | null> {
    return this.userModel.findByIdAndUpdate(userId, updates, { new: true }).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}

export default UserRepository;
