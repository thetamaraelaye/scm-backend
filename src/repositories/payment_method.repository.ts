import { PaymentMethodDoc } from '../types/dbmodel';
import PaymentMethod from '../models/payment_method.model';

export class PaymentMethodRepository {
  constructor() {}

  async create(payload: Partial<PaymentMethodDoc>) {
    try {
      const paymentDetail = new PaymentMethod(payload);
      return await paymentDetail.save();
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<PaymentMethodDoc | null> {
    if (!userId) return null;

    // return this.userModel.findById(userId).exec();
    return await PaymentMethod.findOne({ user_id: userId }).exec();
  }

  async findById(paymentMethodId: string): Promise<PaymentMethodDoc | null> {
    if (!paymentMethodId) return null;

    // return this.userModel.findById(userId).exec();
    return await PaymentMethod.findById(paymentMethodId).exec();
  }

  //   async update(userId: string, updates: Partial<UserDoc>): Promise<UserDoc | null> {
  //     return await User.findByIdAndUpdate(userId, updates, { new: true }).exec();
  //   }

  //   async delete(userId: string) {
  //     await User.findByIdAndDelete(userId).exec();
  //     return;
  //   }
}

export default PaymentMethodRepository;
