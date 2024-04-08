import { User } from '../models/user.model';
import { UserDoc } from '../types/dbmodel';

export class UserRepository {
  constructor() {}

  async create(userData: Partial<UserDoc>){
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string): Promise<UserDoc | null> {
    if (!userId) return null;

    // return this.userModel.findById(userId).exec();
    return await User.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<UserDoc | null> {
    return await User.findOne({ email }).exec();
  }

  async update(userId: string, updates: Partial<UserDoc>): Promise<UserDoc | null> {
    return await User.findByIdAndUpdate(userId, updates, { new: true }).exec();
  }

  async delete(userId: string) {
    await User.findByIdAndDelete(userId).exec();
    return;
  }
}

export default UserRepository;
