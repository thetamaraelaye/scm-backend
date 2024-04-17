import { Schema, model} from 'mongoose';
import { AddressDoc } from '../types/dbmodel';

// Define enum for address types
enum AddressType {
  Home = 'home',
  Business = 'business',
}



// Define Address Schema
const AddressSchema = new Schema<AddressDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  zip_code: { type: Number, default: null },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  address_type: { type: String, enum: Object.values(AddressType), default: AddressType.Home }, // Using AddressType enum
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Define and export Address model
const Address = model<AddressDoc>('Address', AddressSchema);

export { Address, AddressType };
