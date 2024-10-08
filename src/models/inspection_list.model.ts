import { Schema, model} from 'mongoose';
import { InspectionChecklistDoc } from '../types/dbmodel';


// Define InspectionChecklist Schema
const InspectionChecklistSchema = new Schema<InspectionChecklistDoc>({
  inspection_id: { type: Schema.Types.ObjectId, ref: 'Inspection', required: true, unique: true },
  keyboard: { type: String, default: null },
  screen: { type: String, default: null },
  touch_pad: { type: String, default: null },
  camera: { type: String, default: null },
  battery_life: { type: String, default: null },
  ram: { type: String, default: null },
  rom: { type: String, default: null },
  is_charging: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// Define and export InspectionChecklist model
const InspectionChecklist = model<InspectionChecklistDoc>('InspectionChecklist', InspectionChecklistSchema);

export default InspectionChecklist;
