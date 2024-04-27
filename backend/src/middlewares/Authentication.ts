import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class Authentication {
  static middleware = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const token = request.header("Authorization");
    if (!token) return response.status(401).json({ message: "Access Denied" });
    try {
      const decodedToken = jwt.verify(token, "secretKey") as any;
      request.userId = decodedToken.user_Id;
      next();
    } catch (e) {
      console.error(e);
      response.status(401).json({ message: "Invalid token" });
    }
  };
}

export { Authentication };
