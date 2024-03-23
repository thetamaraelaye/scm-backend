import { Schema, model, Document, Mongoose } from 'mongoose';
import { OrderDoc } from './order.model';
import { ProductDoc } from './product.model';


// Define interface for OrderItem document
interface OrderItemDoc extends Document {
  order_id: OrderDoc['_id'];
  product_id: ProductDoc['_id'];
  quantity: number;
  discount_amount?: number | null;
  discount_percentage?: number | null;
  unit_price: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define OrderItem Schema
const OrderItemSchema = new Schema<OrderItemDoc>({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 0 },
  discount_amount: { type: Schema.Types.Decimal128, default: null },
  discount_percentage: { type: Number, default: null },
  unit_price: { type: Schema.Types.Decimal128, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define and export OrderItem model
const OrderItem = model<OrderItemDoc>('OrderItem', OrderItemSchema);

export {OrderItem, OrderItemDoc};
