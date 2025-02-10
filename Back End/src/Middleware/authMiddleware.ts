import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
}

export interface CustomRequest extends Request {
  user?: JWTPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ error: "Not authorized to access this resource" });
    return;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY!);
    (req as CustomRequest).user = data as JWTPayload;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};