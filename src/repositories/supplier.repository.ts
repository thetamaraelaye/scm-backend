import { SupplierDoc} from '../types/dbmodel';
import { Supplier } from '../models/supplier.model';

export class SupplierRepository {
  constructor() {}

  async create(supplierData: Partial<SupplierDoc>) {
    try {
      const newUser = new Supplier(supplierData);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: string) {
    if (!userId) return null;

    // return this.userModel.findById(userId).exec();
    return await Supplier.findById(userId).exec();
  }

  async findByEmail(email: string) {
    return await Supplier.findOne({ email }).exec();
  }

  async update(userId: any, updates: Partial<SupplierDoc>) {
    return await Supplier.findByIdAndUpdate(userId, updates, { new: true }).exec();
  }

  async delete(userId: string) {
    await Supplier.findByIdAndDelete(userId).exec();
    return;
  }

}

export default SupplierRepository;