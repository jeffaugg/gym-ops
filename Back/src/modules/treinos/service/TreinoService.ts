import { inject, injectable } from "tsyringe";
import { TreinoRepository } from "../repository/TreinoRepository";
import { TreinoSchema } from "../dto/TreinoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class TreinoService {
  constructor(
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
  ) {}

  async create(data: z.infer<typeof TreinoSchema>) {
    return await this.treinoRepository.create(data);
  }

  async list() {
    return this.treinoRepository.list();
  }

  async update(id: number, data: z.infer<typeof TreinoSchema>) {
    const workout = await this.treinoRepository.findById(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }


    return await this.treinoRepository.update(id, data);
  }

  async findById(id: number) {
    const workout = await this.treinoRepository.findById(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return workout;
  }

  async delete(id: number) {
    const workout = await this.treinoRepository.findById(id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return await this.treinoRepository.delete(id);
  }

  async findByName(name: string) {
    const workout = await this.treinoRepository.findByName(name);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return workout;
  }


}
