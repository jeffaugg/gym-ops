import { z } from "zod";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { inject, injectable } from "tsyringe";
import { AvaliacoesRepository } from "../repository/AvaliacoesRepository";
import { Avaliacao } from "../models/Avaliacao";
import { FotosRepository } from "../repository/FotosRepository";
import UserRepository from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";

@injectable()
export class AvaliacaoService {
  constructor(
    @inject(AvaliacoesRepository)
    private avaliacoesRepository: AvaliacoesRepository,
    @inject(FotosRepository)
    private fotosRepository: FotosRepository,
    @inject(UserRepository)
    private userRepository: UserRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}
  async create(
    data: z.infer<typeof AvaliacoesSchema> & {
      instructor_id: number;
    },
    adm_id: number,
  ): Promise<Avaliacao> {
    const userById = await this.userRepository.findUserById(
      data.instructor_id,
      adm_id,
    );

    if (!userById) {
      throw new AppError("Instrutor não existe", 404);
    }

    const alunoById = await this.alunoRepository.findById(
      data.aluno_id,
      adm_id,
    );

    if (!alunoById) {
      throw new AppError("Aluno não existe", 404);
    }

    const avaliacao = await this.avaliacoesRepository.create(data);

    avaliacao.photo = [];
    await Promise.all(
      data.photo.map(async (foto) => {
        avaliacao.photo.push(
          await this.fotosRepository.create(foto, avaliacao.id),
        );
      }),
    );

    return data as Avaliacao;
  }

  async list(adm_id: number): Promise<Avaliacao[]> {
    return await this.avaliacoesRepository.list(adm_id);
  }

  async findByAlunoId(aluno_id: string, adm_id: number): Promise<Avaliacao[]> {
    const alunoById = await this.alunoRepository.findById(
      Number(aluno_id),
      adm_id,
    );

    if (!alunoById) {
      throw new AppError("Aluno não existe", 404);
    }

    const avaliacoes = await this.avaliacoesRepository.findByAlunoId(
      aluno_id,
      adm_id,
    );
    return avaliacoes;
  }

  async update(
    id: string,
    data: z.infer<typeof AvaliacoesSchema>,
    adm_id: number,
  ): Promise<Avaliacao> {
    const avaliacao = await this.avaliacoesRepository.findById(id, adm_id);

    if (!avaliacao) {
      throw new AppError("Avaliação não existe", 404);
    }

    const newAvaliacao = await this.avaliacoesRepository.update(
      Number(id),
      data,
    );

    const fotos = await this.fotosRepository.findByAvaliacaoId(Number(id));

    newAvaliacao.photo = fotos;

    return newAvaliacao;
  }

  async delete(id: string, adm_id: number): Promise<void> {
    const avaliacao = await this.avaliacoesRepository.findById(id, adm_id);

    if (!avaliacao) {
      throw new AppError("Avaliação não existe", 404);
    }

    await this.avaliacoesRepository.delete(Number(id));
  }
}
