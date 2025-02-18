import { Pagamento } from "../models/Pagamento";
import { z } from "zod";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { BalanceDaySchema } from "../dto/BalanceDaySchema";

export interface IPagamentoRepository {
  create(
    data: z.infer<typeof PagamentoSchema> & { user_id: number },
  ): Promise<Pagamento>;
  list(adm_id: number, offset: number, limit: number): Promise<Pagamento[]>;
  listBetweenDays(
    adm_id: number,
    start_date: Date,
    end_date: Date,
  ): Promise<(typeof BalanceDaySchema)[]>;
  findById(id: number): Promise<Pagamento | null>;
  findByAlunoId(
    id: number,
    offset: number,
    limit: number,
  ): Promise<Pagamento[]>;
  delete(id: number): Promise<void>;
  isUserPlanPaid(id_aluno: number, adm_id: number): Promise<boolean>;
}
