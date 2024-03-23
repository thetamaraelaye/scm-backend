import { Schema, model, Document } from 'mongoose';
import { ProductDoc } from './product.model';
import { UserDoc } from './user.model';

// Define enum for functionality status
enum FunctionalityStatus {
  Working = 'working',
  NotWorking = 'not_working'
}

// Define interface for Inspection document
interface InspectionDoc extends Document {
  product_id: ProductDoc['_id'];
  inspector_id: UserDoc['_id'];
  inspection_date: Date;
  functionality_status: FunctionalityStatus;
  additional_information?: string | null;
  images?: string[] | null;
  created_at: Date;
  updated_at: Date;
}

// Define Inspection Schema
const InspectionSchema = new Schema<InspectionDoc>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  inspector_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  inspection_date: { type: Date, required: true },
  functionality_status: { type: String, enum: Object.values(FunctionalityStatus), required: true },
  additional_information: { type: String, default: null },
  images: { type: [String], default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Define and export Inspection model
const Inspection = model<InspectionDoc>('Inspection', InspectionSchema);

export { Inspection, FunctionalityStatus, InspectionDoc };
