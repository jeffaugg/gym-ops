import { Knex } from "knex";
import { inject, injectable } from "tsyringe";

@injectable()
export class FotosRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(url: string, avaliacao_id: number): Promise<string[]> {
    const query = `
    INSERT INTO fotos (avaliacao_id, url) 
    VALUES (? ,?)
    RETURNING url;`;

    return await this.db.raw<string[]>(query, [avaliacao_id, url]);
  }
}
