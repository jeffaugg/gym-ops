import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { z } from "zod";
import { Pagamento } from "../models/Pagamento";
import { BalanceDaySchema } from "../dto/BalanceDaySchema";
import { isAfter } from "date-fns";
import { IPagamentoRepository } from "../Interface/IPagamentoRepository";

@injectable()
export class PagamentoRepository implements IPagamentoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof PagamentoSchema> & {
      user_id: number;
    },
  ): Promise<Pagamento> {
    const query = `
      INSERT INTO pagamentos (id_aluno, user_id, id_plano, status, payment, expiration_date)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING id, user_id, id_aluno, id_plano, status, payment, payment_date, expiration_date;
    `;

    const result = await this.db.raw(query, [
      data.id_aluno,
      data.user_id,
      data.id_plano,
      true,
      data.payment,
      data.expiration_date,
    ]);

    return Pagamento.fromDatabase(result.rows[0]);
  }

  async list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Pagamento[]> {
    const query = `
      SELECT pagamentos.*
      FROM pagamentos
      JOIN alunos ON pagamentos.id_aluno = alunos.id
      WHERE alunos.adm_id = ?
      OFFSET ? LIMIT ?
    `;

    const result = await this.db.raw(query, [adm_id, offset, limit]);

    return result.rows.map((pagamentoData: any) =>
      Pagamento.fromDatabase(pagamentoData),
    );
  }

  async listBetween60Days(
    adm_id: number,
  ): Promise<(typeof BalanceDaySchema)[]> {
    const query = `
      SELECT 
        DATE(pagamentos.payment_date) AS payment_day,  
        SUM(planos.price) AS total_price
      FROM pagamentos
      JOIN alunos ON pagamentos.id_aluno = alunos.id
      JOIN planos ON pagamentos.id_plano = planos.id
      WHERE pagamentos.payment_date BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE + INTERVAL '30 days'
        AND pagamentos.status = true
        AND alunos.adm_id = ?
      GROUP BY payment_day  
      ORDER BY payment_day ASC;
    `;

    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((pagamentoData: any) => {
      const formattedDate = new Date(
        pagamentoData.payment_day,
      ).toLocaleDateString("pt-BR");
      const parsedData = BalanceDaySchema.parse({
        payment_day: formattedDate,
        total_price: pagamentoData.total_price,
      });
      return parsedData;
    });
  }

  async findById(id: number): Promise<Pagamento | null> {
    const query = "SELECT * FROM pagamentos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Pagamento.fromDatabase(result.rows[0]);
  }

  async findByAlunoId(
    id: number,
    offset: number,
    limit: number,
  ): Promise<Pagamento[]> {
    const query =
      "SELECT * FROM pagamentos WHERE id_aluno = ? OFFSET ? LIMIT ? ";
    const result = await this.db.raw(query, [id, offset, limit]);

    return result.rows.map((pagamentoData: any) =>
      Pagamento.fromDatabase(pagamentoData),
    );
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM pagamentos WHERE id = ?";
    await this.db.raw(query, [id]);
  }

  async isUserPlanPaid(id_aluno: number, adm_id: number): Promise<boolean> {
    const query = `
      SELECT pagamentos.*
      FROM pagamentos
      JOIN alunos ON pagamentos.id_aluno = alunos.id
      WHERE alunos.adm_id = ? AND alunos.id = ? AND pagamentos.status = true
      ORDER BY expiration_date DESC
      LIMIT 1;
    `;

    const result = await this.db.raw(query, [adm_id, id_aluno]);

    if (result.rows.length === 0) {
      return false;
    }

    const latestExpirationDate = new Date(result.rows[0].expiration_date);

    return isAfter(latestExpirationDate, new Date());
  }
}
