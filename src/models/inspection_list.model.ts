import { Schema, model, Document } from 'mongoose';
import { InspectionDoc } from './inspection.model';

// Define interface for InspectionChecklist document
interface InspectionChecklistDoc extends Document {
  inspection_id: InspectionDoc['_id'];
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

// Define InspectionChecklist Schema
const InspectionChecklistSchema = new Schema<InspectionChecklistDoc>({
  inspection_id: { type: Schema.Types.ObjectId, ref: 'Inspection', required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  keyboard: { type: String, default: null },
  screen: { type: String, default: null },
  touch_pad: { type: String, default: null },
  camera: { type: String, default: null },
  battery_life: { type: String, default: null },
  ram: { type: String, default: null },
  rom: { type: String, default: null },
  is_charging: { type: Boolean, default: false },
});

// Define and export InspectionChecklist model
const InspectionChecklist = model<InspectionChecklistDoc>('InspectionChecklist', InspectionChecklistSchema);

export default InspectionChecklist;
