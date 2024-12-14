import { inject, injectable } from "tsyringe";
import { PlanoRepository } from "../repository/PlanoRepository";
import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";

@injectable()
export class PlanoService {
  constructor(
    @inject(PlanoRepository)
    private planoRepository: PlanoRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async create(data: z.infer<typeof PlanoSchema>) {
    const planoByName = await this.planoRepository.findByName(data.name);

    if (planoByName) {
      throw new AppError("Plano já existe", 409);
    }

    const planoByDuration = await this.planoRepository.findByDuration(
      data.duration,
    );

    if (planoByDuration) {
      throw new AppError("Plano com essa duração já existe", 409);
    }

    return await this.planoRepository.create(data);
  }

  async list() {
    return await this.planoRepository.list();
  }

  async update(id: number, data: z.infer<typeof PlanoSchema>) {
    const plano = await this.planoRepository.findById(id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const planoByName = await this.planoRepository.findByName(data.name);

    if (plano.name != data.name && planoByName) {
      throw new AppError("Plano já existe", 409);
    }

    const planoByDuration = await this.planoRepository.findByDuration(
      data.duration,
    );

    if (plano.duration != data.duration && planoByDuration) {
      throw new AppError("Plano com essa duração já existe", 409);
    }

    return await this.planoRepository.update(id, data);
  }

  async delete(id: number) {
    const plano = await this.planoRepository.findById(id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const planoInUse = await this.alunoRepository.findByPlanId(id);

    if (planoInUse) {
      throw new AppError("Plano está sendo utilizado por um aluno", 409);
    }
    await this.planoRepository.delete(id);
    return plano;
  }
}
