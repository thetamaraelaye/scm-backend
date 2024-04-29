import { Schema, model } from 'mongoose';
import { UserDoc } from '../types/dbmodel';

// Define enum for user roles
enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Supplier = 'supplier',
}

// Define User Schema
const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dial_code: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    nin: { type: Number, default: null },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Staff },
    is_admin: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    permission_id: { type: Schema.Types.ObjectId, ref: 'Permission' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

// Define and export User model
const User = model<UserDoc>('User', UserSchema);

export { User, UserRole };
