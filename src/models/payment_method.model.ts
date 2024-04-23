import { Schema, model} from 'mongoose';
import { PaymentMethodDoc } from '../types/dbmodel';

// Define PaymentMethod Schema
const PaymentMethodSchema = new Schema<PaymentMethodDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  account_name: { type: String, required: true },
  account_number: { type: Number, required: true },
  bank_name: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Define and export PaymentMethod model
const PaymentMethod = model<PaymentMethodDoc>('PaymentMethod', PaymentMethodSchema);

export default PaymentMethod;
