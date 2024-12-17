import { container, injectable } from "tsyringe";
import { TreinoService } from "../service/TreinoService";
import { Request, Response } from "express";
import { TreinoSchema } from "../dto/TreinoSchema";
import { z } from "zod";

@injectable()
export class TreinoController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, notes} = TreinoSchema.parse(req.body);

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.create({
      name,
      notes
    });

    return res.status(201).json(treino);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.list();
    return res.status(200).json(treino);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, notes } =
    TreinoSchema.parse(req.body);

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.update(Number(id), {
      name,
      notes
    });

    return res.status(200).json(treino);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const treinoService = container.resolve(TreinoService);

    await treinoService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.findById(Number(id));
    return res.status(200).json(treino);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const nameSchema = z.string();
    const { name } = req.params;
    nameSchema.parse(name);

    const treinoService = container.resolve(TreinoService);

    const treino = await treinoService.findByName(name);
    return res.status(200).json(treino);
  }
}
