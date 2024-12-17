import { container, injectable } from "tsyringe";
import { MensagemSchema } from "../dto/MensagemSchema";
import { Request, Response } from "express";
import { MensagemService } from "../service/MensagemService";

@injectable()
export class MensagemController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = MensagemSchema.parse(req.body);

    const mensagemService = container.resolve(MensagemService);

    const mensagem = await mensagemService.create(data, req.user.id);

    return res.status(201).json(mensagem);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const mensagemService = container.resolve(MensagemService);

    const mensagens = await mensagemService.list();

    return res.status(200).json(mensagens);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const mensagemService = container.resolve(MensagemService);

    const mensagem = await mensagemService.findById(Number(id));

    return res.status(200).json(mensagem);
  }
}
