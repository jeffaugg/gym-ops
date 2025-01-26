import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserSchema } from "../dto/UserSchema";
import { UserService } from "../service/UserService";
import { UpdateUserSchema } from "../dto/UpdateUserSchema";

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

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const data = UpdateUserSchema.parse(req.body);
    const id = req.user.id;
    const adm_id = req.user.adm_id;

    const userService = container.resolve(UserService);

    const user = await userService.updateUser(id, adm_id, data);

    return res.status(200).json(user);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.id;

    const userService = container.resolve(UserService);

    await userService.delete(Number(id), adm_id);

    return res.status(204).send();
  }

  public async findUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.id;

    const userService = container.resolve(UserService);

    const user = await userService.findUserById(Number(id), adm_id);

    return res.status(200).json(user);
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.id;

    const userService = container.resolve(UserService);

    const users = await userService.getAllUsers(adm_id);

    return res.status(200).json(users);
  }
}

export default UserController;