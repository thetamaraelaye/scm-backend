import { Schema, model, Document } from 'mongoose';
import { OrderDoc } from './order.model';
import { UserDoc } from './user.model';

// Define enum for mode of delivery
enum ModeOfDelivery {
  Road = 'road',
  Air = 'air',
  HomeDelivery = 'home_delivery',
}

// Define enum for delivery status
enum DeliveryStatus {
  Pending = 'pending',
  Delivered = 'delivered',
  InTransit = 'in_transit',
}

// Define interface for LogisticsDelivery document
interface LogisticsDeliveryDoc extends Document {
  order_id: OrderDoc['_id'];
  user_id: UserDoc['_id'];
  courier_provider_name: string;
  tracking_number?: string | null;
  estimated_delivery_date: Date;
  delivery_status: DeliveryStatus;
  mode_of_delivery?: ModeOfDelivery;
  delivery_fee?: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define LogisticsDelivery Schema
const LogisticsDeliverySchema = new Schema<LogisticsDeliveryDoc>({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courier_provider_name: { type: String, required: true },
  tracking_number: { type: String, default: null },
  estimated_delivery_date: { type: Date, required: true },
  delivery_status: { type: String, enum: Object.values(DeliveryStatus), default: DeliveryStatus.Pending },
  mode_of_delivery: { type: String, enum: Object.values(ModeOfDelivery) },
  delivery_fee: { type: Schema.Types.Decimal128, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Define and export LogisticsDelivery model
const LogisticsDelivery = model<LogisticsDeliveryDoc>('LogisticsDelivery', LogisticsDeliverySchema);

export { LogisticsDelivery, ModeOfDelivery, DeliveryStatus, LogisticsDeliveryDoc };
