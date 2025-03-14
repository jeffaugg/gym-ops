import { inject, injectable } from "tsyringe";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { addDays } from "date-fns";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IPagamentoRepository } from "../Interface/IPagamentoRepository";
import { IPlanoRepository } from "../../planos/interface/IPlanoRepository";
import { IAlunoRepository } from "../../alunos/Interface/IAlunoRepository";

@injectable()
export class PagamentoService {
  constructor(
    @inject("PagamentoRepository")
    private pagamentoRepository: IPagamentoRepository,
    @inject("PlanoRepository")
    private planoRepository: IPlanoRepository,
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
  ) {}

  async create(
    data: z.infer<typeof PagamentoSchema>,
    adm_id: number,
    user_id: number,
  ) {
    const plano = await this.planoRepository.findById(data.id_plano, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const aluno = await this.alunoRepository.findById(data.id_aluno, adm_id);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const currentDate = new Date();
    data.expiration_date = addDays(currentDate, plano.duration);

    const teste = await this.alunoRepository.update(aluno.id, adm_id, {
      ...aluno,
      gender: aluno.gender as "M" | "F" | "O",
      status: true,
    });

    return await this.pagamentoRepository.create({ user_id, ...data });
  }

  async list(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return await this.pagamentoRepository.list(adm_id, offset, limit);
  }

  async findById(id: number) {
    const pagamento = await this.pagamentoRepository.findById(id);

    if (!pagamento) {
      throw new AppError("Pagamento não encontrado", 404);
    }

    return pagamento;
  }

  async findByAlunoId(id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    const pagamentos = await this.pagamentoRepository.findByAlunoId(
      id,
      offset,
      limit,
    );
    if (pagamentos.length === 0) {
      throw new AppError("Pagamento não encontrado", 404);
    }

    return pagamentos;
  }

  async delete(id: number) {
    const pagamento = await this.pagamentoRepository.findById(id);

    if (!pagamento) {
      throw new AppError("Pagamento não encontrado", 404);
    }

    await this.pagamentoRepository.delete(id);
  }
}
