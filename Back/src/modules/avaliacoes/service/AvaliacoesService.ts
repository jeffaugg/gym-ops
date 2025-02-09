import { z } from "zod";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { inject, injectable } from "tsyringe";
import { AvaliacoesRepository } from "../repository/AvaliacoesRepository";
import { Avaliacao } from "../models/Avaliacao";
import { FotosRepository } from "../repository/FotosRepository";
import UserRepository from "../../user/repositories/UserRepository";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";

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
      id: number;
    },
    adm_id: number,
  ): Promise<Avaliacao> {
    let userById = await this.userRepository.findUserById(data.id, adm_id);

    if (!userById) {
      userById = await this.userRepository.findAdmById(data.id);
    }

    if (!userById) {
      throw new AppError("Instrutor não existe", 404);
    }

    const alunoById = await this.alunoRepository.findById(
      data.aluno_id,
      adm_id,
    );

    if (!alunoById || !alunoById.status) {
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

    return avaliacao;
  }

  async list(
    adm_id: number,
    page: number,
    limit: number,
  ): Promise<Avaliacao[]> {
    const offset = (page - 1) * limit;
    return await this.avaliacoesRepository.list(adm_id, offset, limit);
  }

  async findByAlunoId(
    aluno_id: number,
    adm_id: number,
    page: number,
    limit: number,
  ): Promise<Avaliacao[]> {
    const alunoById = await this.alunoRepository.findById(
      Number(aluno_id),
      adm_id,
    );

    if (!alunoById || !alunoById.status) {
      throw new AppError("Aluno não existe", 404);
    }

    const offset = getPaginationOffset(page, limit);
    const avaliacoes = await this.avaliacoesRepository.findByAlunoId(
      aluno_id,
      adm_id,
      offset,
      limit,
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
