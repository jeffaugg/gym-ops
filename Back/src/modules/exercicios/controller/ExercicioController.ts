import { container, injectable } from "tsyringe";
import { ExercicioService } from "../service/ExercicioService";
import { Request, Response } from "express";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { z } from "zod";
import { paginationSchema } from "../../../shared/infra/zod/paginationSchema";

@injectable()
export class ExercicioController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = ExercicioSchema.parse(req.body);
    const adm_id = req.user.adm_id;

    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.create(data, adm_id);

    return res.status(201).json(exercicio);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { page, limit } = paginationSchema.parse(req.query);

    const adm_id = req.user.adm_id;
    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.list(adm_id, limit, page);
    return res.status(200).json(exercicio);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = ExercicioSchema.parse(req.body);
    const adm_id = req.user.adm_id;

    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.update(Number(id), adm_id, data);

    return res.status(200).json(exercicio);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const exercicioService = container.resolve(ExercicioService);

    await exercicioService.delete(Number(id), adm_id);
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;
    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.findById(Number(id), adm_id);
    return res.status(200).json(exercicio);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const nameSchema = z.string();
    const { name } = req.params;
    const adm_id = req.user.adm_id;
    nameSchema.parse(name);

    const exercicioService = container.resolve(ExercicioService);

    const exercise = await exercicioService.findByName(name, adm_id);
    return res.status(200).json(exercise);
  }
}
