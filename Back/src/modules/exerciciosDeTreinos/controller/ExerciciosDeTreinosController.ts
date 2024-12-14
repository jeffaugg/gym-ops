import { container, injectable } from "tsyringe";
import { ExerciciosDeTreinosService } from "../service/ExercicioDeTreinosService";
import { Request, Response } from "express";
import { ExerciciosDeTreinosSchema } from "../dto/ExerciciosDeTreinosSchema";
import { z } from "zod";

@injectable()
export class ExerciciosDeTreinosController {
  async create(req: Request, res: Response): Promise<Response> {
    const { treinoId, exercicioId, series, repeticoes, descanso_segundos } =
      ExerciciosDeTreinosSchema.parse(req.body);

    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    const exercicio = await exerciciosDeTreinosService.create({
      treinoId,
      exercicioId,
      series,
      repeticoes,
      descanso_segundos,
    });

    return res.status(201).json(exercicio);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    const exercicios_treinos = await exerciciosDeTreinosService.list();
    return res.status(200).json(exercicios_treinos);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { treinoId, exercicioId, series, repeticoes, descanso_segundos } =
      ExerciciosDeTreinosSchema.parse(req.body);

    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    const exercicio = await exerciciosDeTreinosService.update(Number(id), {
      series,
      repeticoes,
      descanso_segundos,
    });

    return res.status(200).json(exercicio);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    await exerciciosDeTreinosService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    const exercicio = await exerciciosDeTreinosService.findById(Number(id));
    return res.status(200).json(exercicio);
  }

  async findByTreinoId(req: Request, res: Response): Promise<Response> {
    const { treinoId } = req.params;

    const exerciciosDeTreinosService = container.resolve(ExerciciosDeTreinosService);

    const exercicios = await exerciciosDeTreinosService.findByTreinoId(
      Number(treinoId)
    );
    return res.status(200).json(exercicios);
  }
}