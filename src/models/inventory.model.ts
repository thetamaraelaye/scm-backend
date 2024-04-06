import { Schema, model} from 'mongoose';
import { InventoryDoc } from '../types/dbmodel';

// Define enum for inventory status
enum InventoryStatus {
  Available = 'available',
  Unavailable = 'unavailable',
  Picked = 'picked',
  Delivered = 'delivered',
}

// Define Inventory Schema
const InventorySchema = new Schema<InventoryDoc>({
  quantity_in_stock: { type: Number, required: true },
  inventory_status: { type: String, enum: Object.values(InventoryStatus), required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  location_in_warehouse: { type: String, default: null },
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Define and export Inventory model
const Inventory = model<InventoryDoc>('Inventory', InventorySchema);

export { Inventory, InventoryStatus };
