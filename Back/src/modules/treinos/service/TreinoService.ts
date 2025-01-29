import { inject, injectable } from "tsyringe";
import { TreinoRepository } from "../repository/TreinoRepository";
import { TreinoSchema } from "../dto/TreinoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import UserRepository from "../../user/repositories/UserRepository";
import { getPaginationOffset } from "../../../shared/helpers/calculateOffset";

@injectable()
export class TreinoService {
  constructor(
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: z.infer<typeof TreinoSchema>, adm_id: number) {
    const admById = await this.userRepository.findAdmById(adm_id);

    if (!admById || admById.role != "ADM") {
      throw new AppError("Administrador inválido", 404);
    }

    const treinoData = { ...data, adm_id };
    return await this.treinoRepository.create(treinoData);
  }

  async list(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return this.treinoRepository.list(adm_id, offset, limit);
  }

  async update(id: number, adm_id: number, data: z.infer<typeof TreinoSchema>) {
    const workout = await this.treinoRepository.findById(id, adm_id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return await this.treinoRepository.update(id, adm_id, data);
  }

  async findById(id: number, adm_id: number) {
    const workout = await this.treinoRepository.findById(id, adm_id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return workout;
  }

  async delete(id: number, adm_id: number) {
    const workout = await this.treinoRepository.findById(id, adm_id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return await this.treinoRepository.delete(id, adm_id);
  }

  async findByName(name: string, adm_id: number) {
    const workout = await this.treinoRepository.findByName(name, adm_id);

    if (!workout) {
      throw new AppError("Treino não encontrado", 404);
    }

    return workout;
  }
}
