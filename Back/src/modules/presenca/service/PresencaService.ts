import { inject, injectable } from "tsyringe";
import Presenca from "../models/Presenca";
import AppError from "../../../shared/errors/AppError";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IPresencaRepository } from "../interface/IPresencaRepository";
import { IAlunoRepository } from "../../alunos/Interface/IAlunoRepository";
import { IPagamentoRepository } from "../../pagamentos/Interface/IPagamentoRepository";

@injectable()
export class PresencaService {
  constructor(
    @inject("PresencaRepository")
    private presencaRepository: IPresencaRepository,
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
    @inject("PagamentoRepository")
    private pagamentoRepository: IPagamentoRepository,
  ) {}

  async create(id: number, adm_id: number): Promise<Presenca> {
    const aluno = await this.alunoRepository.findById(id, adm_id);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    if (!aluno.status) {
      throw new AppError("Aluno com status inválido", 404);
    }
    const pagamento = await this.pagamentoRepository.isUserPlanPaid(id, adm_id);

    if (!pagamento) {
      throw new AppError("Pagamento não encontrado", 404);
    }

    const presenceAlreadyExists =
      await this.presencaRepository.presenceAlredyExists(id, adm_id);

    if (presenceAlreadyExists) {
      throw new AppError("Presença já registrada", 409);
    }

    return this.presencaRepository.create(id);
  }

  async getFindByAlunoId(
    aluno_id: number,
    adm_id: number,
  ): Promise<Presenca[]> {
    return this.presencaRepository.findByAlunoId(aluno_id, adm_id);
  }

  async delete(id: number, adm_id: number) {
    const presenca = await this.presencaRepository.findById(id, adm_id);

    if (!presenca) {
      throw new AppError("Presença não encontrada", 404);
    }

    return this.presencaRepository.delete(id);
  }

  async getAll(
    adm_id: number,
    page: number,
    limit: number,
  ): Promise<Presenca[]> {
    const offset = getPaginationOffset(page, limit);

    return await this.presencaRepository.getAll(adm_id, offset, limit);
  }
}
