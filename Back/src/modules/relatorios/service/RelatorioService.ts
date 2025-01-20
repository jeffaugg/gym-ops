import { inject, injectable } from "tsyringe";
import { PagamentoRepository } from "../../pagamentos/repository/PagamentoRepository";
import { PlanoRepository } from "../../planos/repository/PlanoRepository"; // Importe o repositório de planos

@injectable()
export class RelatorioService {
  constructor(
    @inject(PagamentoRepository)
    private pagamentoRepository: PagamentoRepository,
    @inject(PlanoRepository) // Injeção do repositório de planos
    private planoRepository: PlanoRepository,
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
}
