import { Types } from 'mongoose';
import { UserRole } from '../models/user.model';

// Define interface for Permission document
interface PermissionDoc extends Document {
  scope: string;
}

// Define interface for User document
interface UserDoc extends Document {
  email: string;
  first_name: string;
  last_name: string;
  dial_code: string;
  phone_number: string;
  password: string;
  nin?: number;
  role: UserRole; // Use UserRole enum here
  created_at: Date;
  updated_at: Date;
  is_admin: Boolean;
  permission_id?: Types.ObjectId;
}

// Define interface for Supplier document
interface SupplierDoc extends Document {
  user_id: Types.ObjectId;
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
  is_approved: Boolean;
  created_at: Date;
  updated_at: Date;
}

export { PermissionDoc, UserDoc, SupplierDoc };
