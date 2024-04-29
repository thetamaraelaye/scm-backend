import Otp from '../models/otp.model';

const generateOtp = function (len: number): string {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < len; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
};

//VERIFY GENERATED OTP
const verifyOtp = async function (userId: any, otp: string, type: string): Promise<any> {
  let existOtp = await Otp.findOne({
    userId,
    otp,
    type,
  });
  const currentDate = new Date();
  if (!existOtp || !existOtp.otpExpiration || existOtp.otpExpiration < currentDate) {
    return null;
  }

  return existOtp._id;
};

export { generateOtp, verifyOtp };
