import { Types } from 'mongoose';
import { UserRole } from '../models/user.model';
import { TrackerStatus } from '../models/supplier_inventory.model';
import { AddressType } from '../models/address.model';
import { GadgetType, StateOfProduct, MemoryType } from '../models/product.model';
import { OrderStatus } from '../models/order.model';
import { DeliveryStatus, ModeOfDelivery } from '../models/logistics_delivery.model';
import { InventoryStatus } from '../models/inventory.model';
import { FunctionalityStatus } from '../models/inspection.model';

// Define interface for Permission document
interface PermissionDoc extends Document {
  scope: string;
}

// Define interface for User document
interface UserDoc extends Document {
  id: Types.ObjectId;
  email: string;
  first_name: string;
  last_name: string;
  dial_code: string;
  phone_number: string;
  password: string;
  nin?: number;
  role: UserRole; // Use UserRole enum here
  created_at: Date;
  updated_at: Date;
  is_admin: Boolean;
  is_verified: Boolean;
  permission_id?: Types.ObjectId;
}

// Define interface for Supplier document
interface SupplierDoc extends Document {
  user_id: Types.ObjectId;
  company_name: string;
  business_registration_id?: string;
  x_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  estimate_inventory_capability: number;
  number_of_clients: number;
  business_email?: string;
  dial_code: string;
  business_phone_number: string;
  is_approved: Boolean;
  created_at: Date;
  updated_at: Date;
}

// Define interface for SupplierInventory document
interface SupplierInventoryDoc extends Document {
  product_id: Types.ObjectId;
  supplier_id: Types.ObjectId;
  quantity?: number;
  tracker_status: TrackerStatus;
  created_at: Date;
  updated_at: Date;
}

// Define interface for Product document
interface ProductDoc extends Document {
  supplier_id: Types.ObjectId;
  created_by: Types.ObjectId;
  created_at: Date;
  arrived_at?: Date | null;
  sold_at?: Date | null;
  updated_at: Date;
  gadget_type: GadgetType;
  brand: string;
  gadget_model: string;
  serial_number: string | null;
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

// Define interface for PaymentMethod document
interface PaymentMethodDoc extends Document {
  user_id: Types.ObjectId;
  account_name: string;
  account_number: number;
  bank_name: string;
  created_at: Date;
  updated_at: Date;
}

// Define interface for Order document
interface OrderDoc extends Document {
  user_id: Types.ObjectId;
  customer_name: string;
  status: OrderStatus;
  total_amount: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define interface for OrderItem document
interface OrderItemDoc extends Document {
  order_id: Types.ObjectId;
  product_id: Types.ObjectId;
  quantity: number;
  discount_amount?: number | null;
  discount_percentage?: number | null;
  unit_price: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define interface for LogisticsDelivery document
interface LogisticsDeliveryDoc extends Document {
  order_id: Types.ObjectId;
  user_id: Types.ObjectId;
  courier_provider_name: string;
  tracking_number?: string | null;
  estimated_delivery_date: Date;
  delivery_status: DeliveryStatus;
  mode_of_delivery?: ModeOfDelivery;
  delivery_fee?: number | null;
  created_at: Date;
  updated_at: Date;
}

// Define interface for Inventory document
interface InventoryDoc extends Document {
  quantity_in_stock: number;
  inventory_status: InventoryStatus;
  product_id: Types.ObjectId;
  location_in_warehouse?: string;
  supplier_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

interface InspectionDoc extends Document {
  product_id: Types.ObjectId;
  inspector_id: Types.ObjectId;
  inspection_date: Date;
  functionality_status: FunctionalityStatus;
  additional_information?: string | null;
  // images: HTMLCollectionOf<HTMLImageElement> | null;
  created_at: Date;
  updated_at: Date;
}

// Define interface for InspectionChecklist document
interface InspectionChecklistDoc extends Document {
  inspection_id: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  keyboard?: string | null;
  screen?: string | null;
  touch_pad?: string | null;
  camera?: string | null;
  battery_life?: string | null;
  ram?: string | null;
  rom?: string | null;
  is_charging: boolean;
}

// Define interface for Address document
interface AddressDoc extends Document {
  user_id: Types.ObjectId;
  zip_code?: number;
  city: string;
  state: string;
  country: string;
  address_type: AddressType; // Use AddressType enum here
  created_at: Date;
  updated_at: Date;
}

//define interface for otp
interface OtpDoc extends Document {
  userId: any;
  type: string;
  otp: string;
  otpExpiration: Date | null;
}

export {
  PermissionDoc,
  UserDoc,
  SupplierDoc,
  SupplierInventoryDoc,
  ProductDoc,
  PaymentMethodDoc,
  OrderDoc,
  OrderItemDoc,
  LogisticsDeliveryDoc,
  InventoryDoc,
  InspectionDoc,
  InspectionChecklistDoc,
  AddressDoc,
  OtpDoc,
};
