 import { Request, Response, NextFunction } from "express";

export const sampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("[Sample Middleware Triggered]");
next();
};