import { container, injectable } from "tsyringe";
import { TreinoService } from "../service/TreinoService";
import { Request, Response } from "express";
import { TreinoSchema } from "../dto/TreinoSchema";
import { z } from "zod";

@injectable()
export class TreinoController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = TreinoSchema.parse(req.body);
    const adm_id = req.user.adm_id;
    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.create(data, adm_id);

    return res.status(201).json(treino);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;
    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.list(adm_id);
    return res.status(200).json(treino);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = TreinoSchema.parse(req.body);
    const adm_id = req.user.adm_id;

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.update(Number(id), adm_id, data);

    return res.status(200).json(treino);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const treinoService = container.resolve(TreinoService);

    await treinoService.delete(Number(id), adm_id);
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.findById(Number(id), adm_id);
    return res.status(200).json(treino);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const nameSchema = z.string();
    const { name } = req.params;
    const adm_id = req.user.adm_id;
    nameSchema.parse(name);

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.findByName(name, adm_id);
    return res.status(200).json(treino);
  }
}
