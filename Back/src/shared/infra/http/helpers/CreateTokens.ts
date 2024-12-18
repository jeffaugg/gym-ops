import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../../../../modules/user/models/User";

export const createAccessToken = (user: User): string => {
  const { secret, expiresIn } = authConfig;

  return sign(
    {
      usarname: user.name,
      role: user.role,
      id: user.id,
    },
    secret,
    {
      expiresIn,
    },
  );
};

export const createRefreshToken = (user: User): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  return sign({ id: user.id, role: user.role }, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};
