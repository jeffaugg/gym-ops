import { inject, injectable } from "tsyringe";
import { ExerciciosDeTreinosRepository } from "../repository/ExerciciosDeTreinosRepository";
import { ExerciciosDeTreinosSchema } from "../dto/ExerciciosDeTreinosSchema";
import { ExercicioRepository } from "../../exercicios/repository/ExercicioRepository";
import { TreinoRepository } from "../../treinos/repository/TreinoRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class ExerciciosDeTreinosService {
  constructor(
    @inject(ExerciciosDeTreinosRepository)
    private exerciciosDeTreinosRepository: ExerciciosDeTreinosRepository,
    @inject(ExercicioRepository)
        private exercicioRepository: ExercicioRepository,
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
  ) {}

  async create(data: z.infer<typeof ExerciciosDeTreinosSchema>) {

    const treinoExistente = await this.treinoRepository.findById(data.treinoId);
    if (!treinoExistente) {
      throw new AppError("Treino não encontrado", 404);
    }

    const exercicioExistente = await this.exercicioRepository.findById(data.exercicioId);
    if (!exercicioExistente) {
      throw new AppError("Exercício não encontrado", 404);
    }

    const existingRelation = await this.exerciciosDeTreinosRepository.findByTreinoId(data.treinoId);

    if (existingRelation) {
      throw new AppError("Esse exercício já está associado a este treino", 409);
    }

    


    return await this.exerciciosDeTreinosRepository.create(data);
  }

  async list() {
    return this.exerciciosDeTreinosRepository.list();
  }

  async update(exercicio_treino_Id: number, data: z.infer<typeof ExerciciosDeTreinosSchema>) {
    const relation = await this.exerciciosDeTreinosRepository.findById(exercicio_treino_Id);

    if (!relation) {
      throw new AppError("Relacionamento entre treino e exercício não encontrado", 404);
    }

    return await this.exerciciosDeTreinosRepository.update(exercicio_treino_Id, data);
  }

  async findById(treinoId: number) {
    const relation = await this.exerciciosDeTreinosRepository.findById(treinoId);

    if (!relation) {
      throw new AppError("Relacionamento entre treino e exercício não encontrado", 404);
    }

    return relation;
  }

  async delete(exercicio_treino_id: number) {
    const relation = await this.exerciciosDeTreinosRepository.findById(exercicio_treino_id);

    if (!relation) {
      throw new AppError("Relacionamento entre treino e exercício não encontrado", 404);
    }

    return await this.exerciciosDeTreinosRepository.delete(exercicio_treino_id);
  }

  async findByTreinoId(treinoId: number) {
    const relation = await this.exerciciosDeTreinosRepository.findByTreinoId(treinoId);

    if (!relation) {
      throw new AppError("Relacionamento entre exercício e treino não encontrado", 404);
    }

    return relation;
  }
}