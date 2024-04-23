import { Schema, model} from 'mongoose';
import { LogisticsDeliveryDoc } from '../types/dbmodel';

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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// Define and export LogisticsDelivery model
const LogisticsDelivery = model<LogisticsDeliveryDoc>('LogisticsDelivery', LogisticsDeliverySchema);

export { LogisticsDelivery, ModeOfDelivery, DeliveryStatus};
