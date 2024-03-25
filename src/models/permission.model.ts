import { Schema, model, Document } from 'mongoose';

// Define interface for Permission document
interface PermissionDoc extends Document {
  scope: string;
}

// Define Permission Schema
const PermissionSchema = new Schema<PermissionDoc>({
  scope: { type: String },
});

// Define and export Permission model
const Permission = model<PermissionDoc>('Permission', PermissionSchema);

export { Permission, PermissionDoc }; // Exporting Permission;
