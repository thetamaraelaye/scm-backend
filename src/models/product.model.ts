import { Schema, model, Document } from 'mongoose';
import { SupplierDoc } from './supplier.model'; // Importing SupplierDoc interface from supplier.model.ts
import {UserDoc} from './user.model';
// Enums
enum GadgetType {
  Laptop = 'laptop',
  Phone = 'phone',
  Accessory = 'accessory',
  Tablet = 'tablet',
  Watch = 'watch',
  Charger = 'charger',
  Others = 'others'
}

enum MemoryType {
  SSD = 'ssd',
  HDD = 'hdd'
}

enum StateOfProduct {
  BrandNew = 'brand_new',
  OpenBox = 'open_box',
  BrandNewNoBox = 'brand_new_no_box',
  ForeignUsed = 'foreign_used',
  NigerianUsed = 'nigerian_used'
}

// Define interface for Product document
interface ProductDoc extends Document {
  supplier_id: SupplierDoc['_id'];
  created_by: UserDoc['_id'];
  created_at: Date;
  arrived_at?: Date | null;
  sold_at?: Date | null;
  updated_at: Date;
  gadget_type: GadgetType;
  brand: string;
  gadget_model: string;
  serial_number: string| null,
  ram?: number | null;
  rom?: number | null;
  is_arrived: boolean;
  returned_at?: Date | null;
  memory_type?: MemoryType | null;
  os?: string | null;
  screen_size?: number | null;
  price: number;
  quantity: number;
  state_of_product: StateOfProduct;
  processor?: string | null;
  graphics_card?: string | null;
  backlit_keyboard: boolean;
  touchscreen: boolean;
  convertible: boolean;
  fingerprint_scanner: boolean;
  face_unlock: boolean;
  camera_megapixels?: number | null;
  sim_type?: string | null;
  network_connectivity?: string | null;
  waterproof: boolean;
  wireless_charging: boolean;
  stylus_included: boolean;
  cellular_connectivity: boolean;
  other_features?: string[] | null;
}

// Define Product Schema
const ProductSchema = new Schema<ProductDoc>({
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  arrived_at: { type: Date, default: null },
  sold_at: { type: Date, default: null },

  updated_at: { type: Date, default: Date.now },
  gadget_type: { type: String, enum: Object.values(GadgetType), required: true },
  brand: { type: String, required: true },
  serial_number: { type: String, default: null },
  gadget_model: { type: String, required: true },
  ram: { type: Number, default: null },
  rom: { type: Number, default: null },
  is_arrived: { type: Boolean, default: false },
  returned_at: { type: Date, default: null },
  memory_type: { type: String, enum: Object.values(MemoryType), default: null },
  os: { type: String, default: null },
  screen_size: { type: Number, default: null },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  state_of_product: { type: String, enum: Object.values(StateOfProduct), required: true },
  processor: { type: String, default: null },
  graphics_card: { type: String, default: null },
  backlit_keyboard: { type: Boolean, default: false },
  touchscreen: { type: Boolean, default: false },
  convertible: { type: Boolean, default: false },
  fingerprint_scanner: { type: Boolean, default: false },
  face_unlock: { type: Boolean, default: false },
  camera_megapixels: { type: Number, default: null },
  sim_type: { type: String, default: null },
  network_connectivity: { type: String, default: null },
  waterproof: { type: Boolean, default: false },
  wireless_charging: { type: Boolean, default: false },
  stylus_included: { type: Boolean, default: false },
  cellular_connectivity: { type: Boolean, default: false },
  other_features: { type: [String], default: null }
});

// Define and export Product model
const Product = model<ProductDoc>('Product', ProductSchema);

export {Product, ProductDoc};
