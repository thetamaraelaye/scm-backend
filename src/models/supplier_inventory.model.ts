import { Schema, model } from 'mongoose';
import { SupplierInventoryDoc } from './../types/dbmodel';


// Define enum for tracker status
enum TrackerStatus {
  Arrived = 'arrived',
  Shipped = 'shipped',
  Sold = 'sold',
}



// Define SupplierInventory Schema
const SupplierInventorySchema = new Schema<SupplierInventoryDoc>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  quantity: { type: Number },
  tracker_status: { type: String, enum: Object.values(TrackerStatus), required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// Define and export SupplierInventory model
const SupplierInventory = model<SupplierInventoryDoc>('SupplierInventory', SupplierInventorySchema);

export { SupplierInventory, TrackerStatus };
