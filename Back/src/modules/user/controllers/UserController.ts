import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";
import { container, injectable } from "tsyringe";

@injectable()
export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role, tel } = req.body;
    const userRepository: UserRepository = container.resolve(UserRepository);
    if (!name || !email || !password || !role || !tel) {
      return res.status(400).json({
        status: "error",
        message: "Dados imcompletos",
      });
    }

    try {
      const novoUsuario: User = await userRepository.create(
        name,
        email,
        password,
        role,
        tel,
      );
      return res.status(201).json(novoUsuario);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const userRepository: UserRepository = container.resolve(UserRepository);
      const { token, serializedUser } = await userRepository.login(
        email,
        password,
      );
      res.cookie("jrt", token, { httpOnly: true });

      return res.status(200).json({
        token,
        user: serializedUser,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
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
  //   async listar(req: Request, res: Response): Promise<Response> {
  //     try {
  //       const usuarios = await this.UserRepository.buscarTodos();
  //       return res.status(200).json(usuarios);
  //     } catch (erro) {
  //       return res.status(500).send('Erro ao listar usuários');
  //     }
  //   }
}

export default UserController;
