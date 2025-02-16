import { z } from "zod";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { inject, injectable } from "tsyringe";
import { Avaliacao } from "../models/Avaliacao";
import AppError from "../../../shared/errors/AppError";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IAvaliacoesRepository } from "../interface/IAvaliacoesRepository";
import { IFotosRepository } from "../interface/IFotosRepository ";
import { IUserRepository } from "../../user/interface/IUserRepository";
import { IAlunoRepository } from "../../alunos/Interface/IAlunoRepository";

@injectable()
export class AvaliacaoService {
  constructor(
    @inject("AvaliacoesRepository")
    private avaliacoesRepository: IAvaliacoesRepository,
    @inject("FotosRepository")
    private fotosRepository: IFotosRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
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
    const offset = getPaginationOffset(page, limit);
    const alunoById = await this.alunoRepository.findById(
      Number(aluno_id),
      adm_id,
    );

    if (!alunoById || !alunoById.status) {
      throw new AppError("Aluno não existe", 404);
    }

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
