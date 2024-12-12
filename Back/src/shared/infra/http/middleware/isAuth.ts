import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../../../errors/AppError";
import authConfig from "../config/auth";

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  tel: string;
  role: string;
  iat: number;
  exp: number;
}

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Precisa estar autenticado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);
    const { id, name, email, role } = decoded as TokenPayload;
    req.user = {
      id,
      name,
      email,
      role,
    };
  } catch (err) {
    throw new AppError("Token invalido", 403);
  }

  return next();
};

export default isAuth;
