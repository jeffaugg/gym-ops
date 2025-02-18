import { inject, injectable } from "tsyringe";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IPagamentoRepository } from "../../pagamentos/Interface/IPagamentoRepository";
import { IPlanoRepository } from "../../planos/interface/IPlanoRepository";
import { IAlunoRepository } from "../../alunos/Interface/IAlunoRepository";
import { ICargoHorariaRepository } from "../../cargoHoraria/interface/ICargoHorariaRepository";
import { IPresencaRepository } from "../../presenca/interface/IPresencaRepository";

@injectable()
export class RelatorioService {
  constructor(
    @inject("PagamentoRepository")
    private pagamentoRepository: IPagamentoRepository,
    @inject("PlanoRepository")
    private planoRepository: IPlanoRepository,
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
    @inject("CargoHorariaRepository")
    private cargoHorariaRepository: ICargoHorariaRepository,
    @inject("PresencaRepository")
    private presencaRepository: IPresencaRepository,
  ) {}

  async balance(adm_id: number, page: number) {
    const balance = await this.pagamentoRepository.listBetween60Days(
      adm_id,
      page,
    );
    return balance;
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

  async listWeekFrequencies(adm_id: number, page: number) {
    return await this.presencaRepository.listWeekFrequencies(adm_id, page);
  }
}
