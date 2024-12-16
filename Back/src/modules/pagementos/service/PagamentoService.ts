import { inject, injectable } from "tsyringe";
import { PagamentoRepository } from "../repository/PagamentoRepository";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { z } from "zod";
import { PlanoRepository } from "../../planos/repository/PlanoRepository";
import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { addDays } from "date-fns";

@injectable()
export class PagamentoService {
  constructor(
    @inject(PagamentoRepository)
    private pagamentoRepository: PagamentoRepository,
    @inject(PlanoRepository)
    private planoRepository: PlanoRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async create(data: z.infer<typeof PagamentoSchema>) {
    const plano = await this.planoRepository.findById(data.id_plano);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    const aluno = await this.alunoRepository.findById(data.id_aluno);

    if (!aluno) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const currentDate = new Date();
    data.expiration_date = addDays(currentDate, plano.duration);

    return await this.pagamentoRepository.create(data);
  }

  async list() {
    return await this.pagamentoRepository.list();
  }

  async findById(id: number) {
    const pagamento = await this.pagamentoRepository.findById(id);

    if (!pagamento) {
      throw new AppError("Pagamento não encontrado", 404);
    }

    return pagamento;
  }

  async findByAlunoId(id: number) {
    const pagamentos = await this.pagamentoRepository.findByAlunoId(id);

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
