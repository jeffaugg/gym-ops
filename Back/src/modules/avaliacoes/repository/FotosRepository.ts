import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { IFotosRepository } from "../interface/IFotosRepository ";

@injectable()
export class FotosRepository implements IFotosRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(url: string, avaliacao_id: number): Promise<string> {
    const query = `
    INSERT INTO fotos_avaliacoes (avaliacao_id, foto_path) 
    VALUES (? ,?)
    RETURNING foto_path;`;

    const result = await this.db.raw(query, [avaliacao_id, url]);
    return result.rows[0].foto_path;
  }

  async findByAvaliacaoId(avaliacao_id: number): Promise<string[]> {
    const query = `
    SELECT foto_path FROM fotos_avaliacoes WHERE avaliacao_id = ?;  
    `;
    const result = await this.db.raw(query, [avaliacao_id]);

    return result.rows.map((foto: any) => foto.foto_path);
  }
}
