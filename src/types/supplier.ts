import { Schema } from 'mongoose';

export interface CreateSupplier {
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
  is_approved: { type: Boolean, default: false },
}

