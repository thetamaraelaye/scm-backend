import { Schema, model } from 'mongoose';
import { InspectionDoc } from '../types/dbmodel';
// Define enum for functionality status
enum FunctionalityStatus {
  Working = 'working',
  NotWorking = 'not_working',
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
  updated_at: { type: Date, default: Date.now },
});

// Define and export Inspection model
const Inspection = model<InspectionDoc>('Inspection', InspectionSchema);

export { Inspection, FunctionalityStatus};
