import { inject, injectable } from "tsyringe";
import { TreinoDeAlunoRepository } from "../repository/TreinoDeAlunoRepository";
import { TreinoDeAlunoSchema } from "../dto/TreinoDeAlunoSchema";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { TreinoRepository } from "../../treinos/repository/TreinoRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import UserRepository from "../../user/repositories/UserRepository";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";

@injectable()
export class TreinoDeAlunoService {
  constructor(
    @inject(TreinoDeAlunoRepository)
    private treinoDeAlunoRepository: TreinoDeAlunoRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(data: z.infer<typeof TreinoDeAlunoSchema>, adm_id: number) {
    const admById = await this.userRepository.findAdmById(adm_id);

    if (!admById || admById.role != "ADM") {
      throw new AppError("Administrador inválido", 404);
    }

    const treinoExistente = await this.treinoRepository.findById(
      data.treino_id,
      adm_id,
    );
    if (!treinoExistente) {
      throw new AppError("Treino não encontrado", 404);
    }

    const alunoExistente = await this.alunoRepository.findById(
      data.aluno_id,
      adm_id,
    );
    if (!alunoExistente || !alunoExistente.status) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const existingRelation =
      await this.treinoDeAlunoRepository.doesRelationExist(
        data.aluno_id,
        data.treino_id,
        adm_id,
      );
    if (existingRelation) {
      throw new AppError("Esse treino já está associado a este aluno", 409);
    }

    return await this.treinoDeAlunoRepository.create(data);
  }

  async list(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return await this.treinoDeAlunoRepository.list(adm_id, offset, limit);
  }

  async findById(treinoId: number) {
    const relation = await this.treinoDeAlunoRepository.findById(treinoId);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre treino e aluno não encontrado",
        404,
      );
    }

    return relation;
  }

  async delete(exercicio_treino_id: number) {
    const relation =
      await this.treinoDeAlunoRepository.findById(exercicio_treino_id);

    if (!relation) {
      throw new AppError(
        "Relacionamento entre treino e aluno não encontrado",
        404,
      );
    }

    return await this.treinoDeAlunoRepository.delete(exercicio_treino_id);
  }

  async findByAlunoId(alunoId: number, limit: number, page: number) {
    const offset = getPaginationOffset(page, limit);
    const relation = await this.treinoDeAlunoRepository.findByAlunoId(
      alunoId,
      offset,
      limit,
    );

    if (!relation) {
      throw new AppError(
        "Relacionamento entre aluno e treino não encontrado",
        404,
      );
    }

    return relation;
  }
}
