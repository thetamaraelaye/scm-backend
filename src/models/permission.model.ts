import { Schema, model, Document } from 'mongoose';
import { PermissionDoc } from '../types/dbmodel';

// Define Permission Schema
const PermissionSchema = new Schema<PermissionDoc>({
  scope: { type: String },
});

// Define and export Permission model
const Permission = model<PermissionDoc>('Permission', PermissionSchema);

export { Permission }; // Exporting Permission;
