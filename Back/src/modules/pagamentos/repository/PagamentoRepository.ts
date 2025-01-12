import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { PagamentoSchema } from "../dto/PagamentoSchema";
import { z } from "zod";
import { Pagamento } from "../models/Pagamento";

@injectable()
export class PagamentoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof PagamentoSchema>): Promise<Pagamento> {
    const query = `
      INSERT INTO pagamentos (id_aluno, id_plano, status, payment, expiration_date)
      VALUES (?, ?, ?, ?, ?)
      RETURNING id, id_aluno, id_plano, status, payment, payment_date, expiration_date;
    `;

    const result = await this.db.raw(query, [
      data.id_aluno,
      data.id_plano,
      true,
      data.payment,
      data.expiration_date,
    ]);

    return Pagamento.fromDatabase(result.rows[0]);
  }

  async list(adm_id: number): Promise<Pagamento[]> {
    const query = `
      SELECT pagamentos.*
      FROM pagamentos
      JOIN alunos ON pagamentos.id_aluno = alunos.id
      WHERE alunos.adm_id = ?
    `;

    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((pagamentoData: any) =>
      Pagamento.fromDatabase(pagamentoData),
    );
  }

  async listBetween60Days(): Promise<Pagamento[]> {
    const query = `
      SELECT pagamentos.*
      FROM pagamentos
      WHERE pagamentos.payment_date BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE + INTERVAL '30 days'
        AND pagamentos.status = true
    `;

    const result = await this.db.raw(query);

    return result.rows.map((pagamentoData: any) =>
      Pagamento.fromDatabase(pagamentoData),
    );
  }

  async findById(id: number): Promise<Pagamento | null> {
    const query = "SELECT * FROM pagamentos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Pagamento.fromDatabase(result.rows[0]);
  }

  async findByAlunoId(id: number): Promise<Pagamento[]> {
    const query = "SELECT * FROM pagamentos WHERE id_aluno = ?";
    const result = await this.db.raw(query, [id]);

    return result.rows.map((pagamentoData: any) =>
      Pagamento.fromDatabase(pagamentoData),
    );
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM pagamentos WHERE id = ?";
    await this.db.raw(query, [id]);
  }
}
