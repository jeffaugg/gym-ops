import { TokenPayload } from "../../shared/infra/http/middleware/isAuth";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<TokenPayload, "iat" | "exp">; // define user como um objeto request opcional
    }
  }
}
