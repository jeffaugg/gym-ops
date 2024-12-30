import { inject, injectable } from "tsyringe";
import { ExercicioRepository } from "../repository/ExercicioRepository";
import { ExercicioSchema } from "../dto/ExercicioSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import UserRepository from "../../user/repositories/UserRepository";

@injectable()
export class ExercicioService {
  constructor(
    @inject(ExercicioRepository)
    private exercicioRepository: ExercicioRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: z.infer<typeof ExercicioSchema>, adm_id: number) {
    const admById = await this.userRepository.findById(adm_id);

    if (!admById) {
      throw new AppError("Administrador inválido", 404);
    }

    const exerciseByName = await this.exercicioRepository.findByName(
      data.name,
      adm_id,
    );

    if (exerciseByName) {
      throw new AppError("Já existe um exercício com esse nome", 409);
    }

    const exercicioData = { ...data, adm_id };
    return await this.exercicioRepository.create(exercicioData);
  }

  async list(adm_id: number) {
    return this.exercicioRepository.list(adm_id);
  }

  async update(
    id: number,
    adm_id: number,
    data: z.infer<typeof ExercicioSchema>,
  ) {
    const exercise = await this.exercicioRepository.findById(id, adm_id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return await this.exercicioRepository.update(id, adm_id, data);
  }

  async findById(id: number, adm_id: number) {
    const exercise = await this.exercicioRepository.findById(id, adm_id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return exercise;
  }

  async delete(id: number, adm_id: number) {
    const exercise = await this.exercicioRepository.findById(id, adm_id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return await this.exercicioRepository.delete(id, adm_id);
  }

  async findByName(name: string, adm_id: number) {
    const exercise = await this.exercicioRepository.findByName(name, adm_id);

    if (!exercise) {
      throw new AppError("Exercício não encontrado", 404);
    }

    return exercise;
  }
}
