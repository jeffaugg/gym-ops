import { container, injectable } from "tsyringe";
import { ExercicioDeTreinoService } from "../service/ExercicioDeTreinosService";
import { Request, Response } from "express";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";
import { paginationSchema } from "../../../shared/infra/zod/paginationSchema";

@injectable()
export class ExercicioDeTreinoController {
  async create(req: Request, res: Response): Promise<Response> {
    const data = ExercicioDeTreinoSchema.parse(req.body);
    const adm_id = req.user.adm_id;
    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );

    const exercicio_de_treino = await exercicioDeTreinoService.create(
      data,
      adm_id,
    );

    return res.status(201).json(exercicio_de_treino);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;
    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );
    const { page, limit } = paginationSchema.parse(req.query);

    const exercicios_treinos = await exercicioDeTreinoService.list(
      adm_id,
      page,
      limit,
    );
    return res.status(200).json(exercicios_treinos);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { treino_id, exercicio_id, series, repeticoes, descanso_segundos } =
      ExercicioDeTreinoSchema.parse(req.body);

    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );

    const exercicio_de_treino = await exercicioDeTreinoService.update(
      Number(id),
      {
        treino_id,
        exercicio_id,
        series,
        repeticoes,
        descanso_segundos,
      },
    );

    return res.status(200).json(exercicio_de_treino);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );

    await exercicioDeTreinoService.delete(Number(id));
    return res.status(204).json();
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );

    const exercicio = await exercicioDeTreinoService.findById(Number(id));
    return res.status(200).json(exercicio);
  }

  async findByTreinoId(req: Request, res: Response): Promise<Response> {
    const { treinoId } = req.params;
    const { page, limit } = paginationSchema.parse(req.query);
    const exercicioDeTreinoService = container.resolve(
      ExercicioDeTreinoService,
    );

    const exercicios_de_treino = await exercicioDeTreinoService.findByTreinoId(
      Number(treinoId),
      page,
      limit,
    );
    return res.status(200).json(exercicios_de_treino);
  }
}
