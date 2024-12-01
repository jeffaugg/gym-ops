import UserRepository from "../repositories/UserRepository";
import AppError from "../errors/AppError";
import {
  createAccessToken,
  createRefreshToken
} from "./CreateTokens";
import { SerializeUser } from "./SerializeUser";
const userRepository = new UserRepository();

interface SerializedUser {
    id: number;
    name: string;
    email: string;
    tel: string;
    role: string;
}

interface Request {
  email: string;
  password: string;
}

interface Response {
  serializedUser: SerializedUser;
  token: string;
  refreshToken: string;
}

const AuthUserService = async ({email, password}: Request): Promise<Response> => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new AppError("ERR_INVALID_CREDENTIALS", 401);
    }

    if (!(await user.checkPassword(password))) {
        throw new AppError("ERR_INVALID_CREDENTIALS", 401);
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const serializedUser = await SerializeUser(user);

    return {
        serializedUser,
        token,
        refreshToken
    };
};

export default AuthUserService;