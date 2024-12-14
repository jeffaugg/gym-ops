import { container, injectable } from "tsyringe";
import { ExercicioService } from "../service/ExercicioService";
import { Request, Response } from "express";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { z } from "zod";

@injectable()
export class ExercicioController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, muscles} =
        ExercicioSchema.parse(req.body);

    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.create({
      name,
      muscles
    });

    return res.status(201).json(exercicio);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.list();
    return res.status(200).json(exercicio);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, muscles } =
    ExercicioSchema.parse(req.body);

    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.update(Number(id), {
      name,
      muscles
    });

    return res.status(200).json(exercicio);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exercicioService = container.resolve(ExercicioService);

    await exercicioService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exercicioService = container.resolve(ExercicioService);

    const exercicio = await exercicioService.findById(Number(id));
    return res.status(200).json(exercicio);
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const nameSchema = z.string();
    const { name } = req.params;
    nameSchema.parse(name);

    const exercicioService = container.resolve(ExercicioService);

    const exercise = await exercicioService.findByName(name);
    return res.status(200).json(exercise);
  }
}
