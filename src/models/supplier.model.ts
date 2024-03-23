import { Schema, model, Document } from 'mongoose';
import { UserDoc } from './user.model'; // Importing UserDoc interface from user.model.ts

// Define interface for Supplier document
interface SupplierDoc extends Document {
  user_id: UserDoc['_id'];
  company_name: string;
  business_registration_id?: string;
  x_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  estimate_inventory_capability: number;
  number_of_clients: number;
  business_email?: string;
  dial_code: string;
  business_phone_number: string;
  is_approved: Boolean,
  created_at: Date;
  updated_at: Date;
}

// Define Supplier Schema
const SupplierSchema = new Schema<SupplierDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company_name: { type: String, required: true },
  business_registration_id: { type: String, default: null },
  x_url: { type: String, default: null },
  instagram_url: { type: String, default: null },
  facebook_url: { type: String, default: null },
  estimate_inventory_capability: { type: Number, default: 0 },
  number_of_clients: { type: Number, default: 0 },
  business_email: { type: String, unique: true, default: null },
  dial_code: { type: String, required: true },
  business_phone_number: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_approved: { type: Boolean, default:false}
});

// Define and export Supplier model
const Supplier = model<SupplierDoc>('Supplier', SupplierSchema);

export { Supplier, SupplierDoc }; // Exporting Supplier;
