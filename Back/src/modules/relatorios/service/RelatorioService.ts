import { inject, injectable } from "tsyringe";
import { PagamentoRepository } from "../../pagamentos/repository/PagamentoRepository";
import { PlanoRepository } from "../../planos/repository/PlanoRepository"; // Importe o repositório de planos
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import { CargoHorariaRepository } from "../../cargoHoraria/repository/CargoHorariaRepository";

@injectable()
export class RelatorioService {
  constructor(
    @inject(PagamentoRepository)
    private pagamentoRepository: PagamentoRepository,
    @inject(PlanoRepository) // Injeção do repositório de planos
    private planoRepository: PlanoRepository,
    @inject(AlunoRepository)
    private alunoRepository: AlunoRepository,
    @inject(CargoHorariaRepository)
    private cargoHorariaRepository: CargoHorariaRepository,
  ) {}

  async balance() {
    const payments = await this.pagamentoRepository.listBetween60Days();
    return Promise.all(
      payments.map(async (pagamentoData: any) => {
        const plano = await this.planoRepository.findByIdWithoutAdm(
          pagamentoData.id_plano,
        );
        pagamentoData.plano = plano;
        pagamentoData.payment_date = this.formatDate(
          pagamentoData.payment_date,
        );
        return pagamentoData;
      }),
    );
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async listByFrequency(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return await this.alunoRepository.listByFrequency(adm_id, offset, limit);
  }

  async listRecentRecords(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);

    return await this.alunoRepository.listRecentRecords(adm_id, offset, limit);
  }

  async listRecentFrequency(adm_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);

    return await this.alunoRepository.listRecentFrequency(
      adm_id,
      offset,
      limit,
    );
  }

  async listNow(admin_id: number, page: number, limit: number) {
    const offset = getPaginationOffset(page, limit);
    return await this.cargoHorariaRepository.listNow(admin_id, offset, limit);
  }
}
