import { Schema, model} from 'mongoose';
import {OrderDoc} from "../types/dbmodel";

// Define enum for order status
enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Fulfilled = 'fulfilled',
  Failed = 'failed',
}


// Define Order Schema
const OrderSchema = new Schema<OrderDoc>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer_name: { type: String, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Pending },
  total_amount: { type: Schema.Types.Decimal128, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Define and export Order model
const Order = model<OrderDoc>('Order', OrderSchema);

export { Order, OrderStatus };
