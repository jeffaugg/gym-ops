import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { Pool } from 'pg'; // Importando a conexão com o banco
import { db } from "../app";

export class UserController {
    private UserRepository: UserRepository;

    constructor() {
        this.UserRepository = new UserRepository();
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).send("Dados incompletos.");
        }

        try {
        const novoUsuario = await this.UserRepository.create(name, email, password, role);
            return res.status(201).json(novoUsuario);
        } catch (erro) {
            return res.status(500).send('Erro ao criar usuário');
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