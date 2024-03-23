import { Schema, model, Document } from 'mongoose';
import { UserDoc } from './user.model';

// Define enum for order status
enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Fulfilled = 'fulfilled',
  Failed = 'failed'
}

// Define interface for Order document
interface OrderDoc extends Document {
  user_id: UserDoc['_id'];
  customer_name: string;
  status: OrderStatus;
  total_amount: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define Order Schema
const OrderSchema = new Schema<OrderDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer_name: { type: String, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Pending },
  total_amount: { type: Schema.Types.Decimal128, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define and export Order model
const Order = model<OrderDoc>('Order', OrderSchema);

export { Order, OrderDoc };
