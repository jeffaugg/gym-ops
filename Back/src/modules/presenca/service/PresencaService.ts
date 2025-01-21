import { inject, injectable } from "tsyringe";
import { PresencaRepository } from "../repository/PresencaRepository";
import Presenca from "../models/Presenca";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import AppError from "../../../shared/errors/AppError";
import { PagamentoRepository } from "../../pagamentos/repository/PagamentoRepository";

@injectable()
export class PresencaService {
  constructor(
    @inject(PresencaRepository)
    private presencaRepository: PresencaRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
    @inject(PagamentoRepository)
    private pagamentoRepository: PagamentoRepository,
  ) {}

  async create(id: number, adm_id: number): Promise<Presenca> {
    const aluno = await this.alunoRepository.findById(id, adm_id);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
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

  async getAll(adm_id: number): Promise<Presenca[]> {
    return await this.presencaRepository.getAll(adm_id);
  }
}
