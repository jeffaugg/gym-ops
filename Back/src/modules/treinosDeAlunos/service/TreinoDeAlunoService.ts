import { inject, injectable } from "tsyringe";
import { TreinoDeAlunoRepository } from "../repository/TreinoDeAlunoRepository";
import { TreinoDeAlunoSchema } from "../dto/TreinoDeAlunoSchema";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { TreinoRepository } from "../../treinos/repository/TreinoRepository";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class TreinoDeAlunoService {
  constructor(
    @inject(TreinoDeAlunoRepository)
    private treinoDeAlunoRepository: TreinoDeAlunoRepository,
    @inject(AlunoRepository)
        private alunoRepository: AlunoRepository,
    @inject(TreinoRepository)
    private treinoRepository: TreinoRepository,
  ) {}

  async create(data: z.infer<typeof TreinoDeAlunoSchema>) {

    const treinoExistente = await this.treinoRepository.findById(data.treino_id);
    if (!treinoExistente) {
      throw new AppError("Treino não encontrado", 404);
    }

    const alunoExistente = await this.alunoRepository.findById(data.aluno_id);
    if (!alunoExistente) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const existingRelation = await this.treinoDeAlunoRepository.findByAlunoId(data.aluno_id);
    if (existingRelation != null && existingRelation.treino_id == data.treino_id) {
      throw new AppError("Esse treino já está associado a este aluno", 409);
    }

    


    return await this.treinoDeAlunoRepository.create(data);
  }

  async list() {
    return this.treinoDeAlunoRepository.list();
  }

  async findById(treinoId: number) {
    const relation = await this.treinoDeAlunoRepository.findById(treinoId);

    if (!relation) {
      throw new AppError("Relacionamento entre treino e aluno não encontrado", 404);
    }

    return relation;
  }

  async delete(exercicio_treino_id: number) {
    const relation = await this.treinoDeAlunoRepository.findById(exercicio_treino_id);

    if (!relation) {
      throw new AppError("Relacionamento entre treino e aluno não encontrado", 404);
    }

    return await this.treinoDeAlunoRepository.delete(exercicio_treino_id);
  }

  async findByAlunoId(alunoId: number) {
    const relation = await this.treinoDeAlunoRepository.findByAlunoId(alunoId);

    if (!relation) {
      throw new AppError("Relacionamento entre aluno e treino não encontrado", 404);
    }

    return relation;
  }
}