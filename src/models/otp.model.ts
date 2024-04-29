import mongoose, { Schema, model } from 'mongoose';
import { OtpDoc } from '../types/dbmodel';

export enum OtpType {
  FORGET = 'forget',
  VERIFICATION = 'verification',
}

const OtpSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(OtpType),
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiration: {
      type: Date,
    },
  },
  { timestamps: true },
);

//Define and export otp model
const Otp = model<OtpDoc>('Otp', OtpSchema);

export default Otp;
