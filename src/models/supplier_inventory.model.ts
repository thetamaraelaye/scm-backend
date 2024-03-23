import { Schema, model, Document } from 'mongoose';
import { ProductDoc } from './product.model';
import { SupplierDoc } from './supplier.model';

// Define enum for tracker status
enum TrackerStatus {
  Arrived = 'arrived',
  Shipped = 'shipped',
  Sold = 'sold'
}

// Define interface for SupplierInventory document
interface SupplierInventoryDoc extends Document {
  product_id: ProductDoc['_id'];
  supplier_id: SupplierDoc['_id'];
  quantity?: number;
  tracker_status: TrackerStatus;
  created_at: Date;
  updated_at: Date;
}

// Define SupplierInventory Schema
const SupplierInventorySchema = new Schema<SupplierInventoryDoc>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  quantity: { type: Number },
  tracker_status: { type: String, enum: Object.values(TrackerStatus), required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define and export SupplierInventory model
const SupplierInventory = model<SupplierInventoryDoc>('SupplierInventory', SupplierInventorySchema);

export { SupplierInventory, TrackerStatus };
