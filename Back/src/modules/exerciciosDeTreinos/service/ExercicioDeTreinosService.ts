import { inject, injectable } from "tsyringe";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IExercicioDeTreinoRepository } from "../interface/IExercicioDeTreinoRepository";
import { IExercicioRepository } from "../../exercicios/interface/IExercicioRepository";
import { ITreinoRepository } from "../../treinos/interface/ITreinoRepository";

@injectable()
export class ExercicioDeTreinoService {
  constructor(
    @inject("ExercicioDeTreinoRepository")
    private exercicioDeTreinoRepository: IExercicioDeTreinoRepository,
    @inject("ExercicioRepository")
    private exercicioRepository: IExercicioRepository,
    @inject("TreinoRepository")
    private treinoRepository: ITreinoRepository,
  ) {}

  async create(data: z.infer<typeof ExercicioDeTreinoSchema>, adm_id: number) {
    const treinoExistente = await this.treinoRepository.findById(
      data.treino_id,
      adm_id,
    );
    if (!treinoExistente) {
      throw new AppError("Treino não encontrado", 404);
    }

    const exercicioExistente = await this.exercicioRepository.findById(
      data.exercicio_id,
      adm_id,
    );
    if (!exercicioExistente) {
      throw new AppError("Exercício não encontrado", 404);
    }

    const existingRelation =
      await this.exercicioDeTreinoRepository.doesRelationExist(
        data.treino_id,
        data.exercicio_id,
        adm_id,
      );

    if (existingRelation) {
      throw new AppError("Esse exercício já está associado a este treino", 409);
    }

    return await this.exercicioDeTreinoRepository.create(data);
  }

  async list(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return this.exercicioDeTreinoRepository.list(adm_id, offset, limit);
  }

  async update(
    exercicio_treino_Id: number,
    data: z.infer<typeof ExercicioDeTreinoSchema>,
  ) {
    const relation =
      await this.exercicioDeTreinoRepository.findById(exercicio_treino_Id);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre treino e exercício não encontrado",
        404,
      );
    }

    return await this.exercicioDeTreinoRepository.update(
      exercicio_treino_Id,
      data,
    );
  }

  async findById(treino_id: number) {
    const relation = await this.exercicioDeTreinoRepository.findById(treino_id);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre treino e exercício não encontrado",
        404,
      );
    }

    return relation;
  }

  async delete(exercicio_treino_id: number) {
    const relation =
      await this.exercicioDeTreinoRepository.findById(exercicio_treino_id);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre treino e exercício não encontrado",
        404,
      );
    }

    return await this.exercicioDeTreinoRepository.delete(exercicio_treino_id);
  }

  async findByTreinoId(treino_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    const relation = await this.exercicioDeTreinoRepository.findByTreinoId(
      treino_id,
      offset,
      limit,
    );

    if (!relation) {
      throw new AppError(
        "Relacionamento entre exercício e treino não encontrado",
        404,
      );
    }

    return relation;
  }
}
