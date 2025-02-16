import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";
import AppError from "../../../shared/errors/AppError";
import { getPaginationOffset as GetOffsetForPage } from "../../../shared/helpers/getPaginationOffset";
import { IPlanoRepository } from "../interface/IPlanoRepository";
import { IAlunoRepository } from "../../alunos/Interface/IAlunoRepository";

@injectable()
export class PlanoService {
  constructor(
    @inject("PlanoRepository")
    private planoRepository: IPlanoRepository,
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
  ) {}

  async create(data: z.infer<typeof PlanoSchema>, adm_id: number) {
    const planoByName = await this.planoRepository.findByName(
      data.name,
      adm_id,
    );

    if (planoByName) {
      throw new AppError("Plano já existe", 409);
    }

    const planoByDuration = await this.planoRepository.findByDuration(
      data.duration,
      adm_id,
    );

    if (planoByDuration) {
      throw new AppError("Plano com essa duração já existe", 409);
    }

    const planoData = { ...data, adm_id };
    return await this.planoRepository.create(planoData);
  }

  async list(adm_id: number, page: number, limit: number) {
    const offset = GetOffsetForPage(page, limit);
    return await this.planoRepository.list(adm_id, offset, limit);
  }

  async update(id: number, adm_id: number, data: z.infer<typeof PlanoSchema>) {
    const plano = await this.planoRepository.findById(id, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const planoByName = await this.planoRepository.findByName(
      data.name,
      adm_id,
    );

    if (plano.name != data.name && planoByName) {
      throw new AppError("Plano já existe", 409);
    }

    const planoByDuration = await this.planoRepository.findByDuration(
      data.duration,
      adm_id,
    );

    if (plano.duration != data.duration && planoByDuration) {
      throw new AppError("Plano com essa duração já existe", 409);
    }

    return await this.planoRepository.update(id, data, adm_id);
  }

  async delete(id: number, adm_id: number) {
    const plano = await this.planoRepository.findById(id, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const planoInUse = await this.alunoRepository.findByPlanId(id, adm_id);

    if (planoInUse) {
      throw new AppError("Plano está sendo utilizado por um aluno", 409);
    }
    await this.planoRepository.delete(id, adm_id);
    return plano;
  }

  async findById(id: number, adm_id: number) {
    const plano = await this.planoRepository.findById(id, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    return plano;
  }
}
