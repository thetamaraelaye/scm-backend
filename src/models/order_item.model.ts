import { Schema, model} from 'mongoose';
import { OrderItemDoc } from '../types/dbmodel';

// Define OrderItem Schema
const OrderItemSchema = new Schema<OrderItemDoc>({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 0 },
  discount_amount: { type: Schema.Types.Decimal128, default: null },
  discount_percentage: { type: Number, default: null },
  unit_price: { type: Schema.Types.Decimal128, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// Define and export OrderItem model
const OrderItem = model<OrderItemDoc>('OrderItem', OrderItemSchema);

export { OrderItem};
