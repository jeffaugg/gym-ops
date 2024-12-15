import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { MensagemSchema } from "../dto/MensagemSchema";
import { Mensagem } from "../models/Mensagem";

@injectable()
export class MensagemRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof MensagemSchema>,
    id_adm: number,
  ): Promise<Mensagem> {
    const query = `
      INSERT INTO mensagens (id_adm, title, body, recipient_type)
      VALUES (?, ?, ?, ?)
      RETURNING id, id_adm, title, body, recipient_type, created_at;
    `;

    const result = await this.db.raw(query, [
      id_adm,
      data.title,
      data.body,
      data.recipient_type,
    ]);

    return result.rows[0] as Mensagem;
  }
}
