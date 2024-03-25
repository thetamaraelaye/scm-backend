import { Schema, model, Document } from 'mongoose';
import { PermissionDoc } from './permission.model';

// Define enum for user roles
enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Supplier = 'supplier',
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
  permission_id?: PermissionDoc['_id'];
}

// Define User Schema
const UserSchema = new Schema<UserDoc>({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dial_code: { type: String, required: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  nin: { type: Number, default: null },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.Staff },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_admin: { type: Boolean, default: false },
  permission_id: { type: Schema.Types.ObjectId, ref: 'Permission' },
});

// Define and export User model
const User = model<UserDoc>('User', UserSchema);

export { User, UserRole, UserDoc };
