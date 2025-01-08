import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserSchema } from "../dto/UserSchema";
import { UserService } from "../service/UserService";

@injectable()
export class UserController {
  public async createAdm(req: Request, res: Response): Promise<Response> {
    const data = UserSchema.parse(req.body);

    const userService = container.resolve(UserService);
    const user = await userService.createAdm(data);
    return res.status(201).json(user);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const data = UserSchema.parse(req.body);
    const adm_id = req.user.id;

    const userService = container.resolve(UserService);
    const user = await userService.createUser({ ...data, adm_id });
    return res.status(201).json(user);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const userService = container.resolve(UserService);
    const { token, serializedUser } = await userService.login(email, password);
    res.cookie("jrt", token, { httpOnly: true });

    return res.status(200).json({
      token,
      user: serializedUser,
    });
  }
  public async test(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).json({
        message: "hahaha",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = UserSchema.parse(req.body);

    const id = req.user.id;

    const userService = container.resolve(UserService);

    const user = await userService.update(id, data);

    return res.status(200).json(user);
  }
}

export default UserController;
