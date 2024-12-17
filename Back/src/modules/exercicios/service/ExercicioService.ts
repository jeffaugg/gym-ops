import { inject, injectable } from "tsyringe";
import { ExercicioRepository } from "../repository/ExercicioRepository";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class ExercicioService {
  constructor(
    @inject(ExercicioRepository)
    private exercicioRepository: ExercicioRepository,
  ) {}

  async create(data: z.infer<typeof ExercicioSchema>) {

    const exerciseByName = await this.exercicioRepository.findByName(data.name);

    if (exerciseByName) {
      throw new AppError("Já existe um exercício com esse nome", 409);
    }

   

    return await this.exercicioRepository.create(data);
  }

  async list() {
    return this.exercicioRepository.list();
  }

  async update(id: number, data: z.infer<typeof ExercicioSchema>) {
    const exercise = await this.exercicioRepository.findById(id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }


   

    return await this.exercicioRepository.update(id, data);
  }

  async findById(id: number) {
    const exercise = await this.exercicioRepository.findById(id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return exercise;
  }

  async delete(id: number) {
    const exercise = await this.exercicioRepository.findById(id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return await this.exercicioRepository.delete(id);
  }

  async findByName(name: string) {
    const exercise = await this.exercicioRepository.findByName(name);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return exercise;
  }


}
