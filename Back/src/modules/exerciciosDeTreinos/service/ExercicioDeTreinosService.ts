import { inject, injectable } from "tsyringe";
import { ExercicioDeTreinoRepository } from "../repository/ExercicioDeTreinoRepository";
import { ExercicioDeTreinoSchema } from "../dto/ExercicioDeTreinoSchema";
import { ExercicioRepository } from "../../exercicios/repository/ExercicioRepository";
import { TreinoRepository } from "../../treinos/repository/TreinoRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class ExercicioDeTreinoService {
  constructor(
    @inject(ExercicioDeTreinoRepository)
    private exercicioDeTreinoRepository: ExercicioDeTreinoRepository,
    @inject(ExercicioRepository)
    private exercicioRepository: ExercicioRepository,
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
  ) {}

  async create(data: z.infer<typeof ExercicioDeTreinoSchema>) {
    const treinoExistente = await this.treinoRepository.findById(
      data.treino_id,
    );
    if (!treinoExistente) {
      throw new AppError("Treino não encontrado", 404);
    }

    const exercicioExistente = await this.exercicioRepository.findById(
      data.exercicio_id,
    );
    if (!exercicioExistente) {
      throw new AppError("Exercício não encontrado", 404);
    }

    const existingRelation =
      await this.exercicioDeTreinoRepository.findByTreinoId(data.treino_id);

    if (
      existingRelation != null &&
      existingRelation.exercicio_id == data.exercicio_id
    ) {
      throw new AppError("Esse exercício já está associado a este treino", 409);
    }

    return await this.exercicioDeTreinoRepository.create(data);
  }

  async list() {
    return this.exercicioDeTreinoRepository.list();
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

  async findByTreinoId(treino_id: number) {
    const relation =
      await this.exercicioDeTreinoRepository.findByTreinoId(treino_id);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre exercício e treino não encontrado",
        404,
      );
    }

    return relation;
  }
}
