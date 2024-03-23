import { Schema, model, Document } from 'mongoose';
import { UserDoc } from './user.model'; // Importing UserDoc interface from user.model.ts

// Define interface for PaymentMethod document
interface PaymentMethodDoc extends Document {
  user_id: UserDoc['_id'];
  account_name: string;
  account_number: number;
  bank_name: string;
  created_at: Date;
  updated_at: Date;
}

// Define PaymentMethod Schema
const PaymentMethodSchema = new Schema<PaymentMethodDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  account_name: { type: String, required: true },
  account_number: { type: Number, required: true },
  bank_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define and export PaymentMethod model
const PaymentMethod = model<PaymentMethodDoc>('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod;
