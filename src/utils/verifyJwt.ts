import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      identity?: any; // Replace 'any' with the type of your 'identity' property if possible
    }
  }
}

export default async function verifyJwt(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.headers['authorization'];

    if (!token) {
      throw new Error('access token is missing');
    }

    const jwtToken = token!.split(' ')[1];
    const HydratedUser = jwt.verify(jwtToken, process.env.JWT_SECRET!);
    request.identity = HydratedUser;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('invalid or expired access token');
    }
    next(error);
  }
}
