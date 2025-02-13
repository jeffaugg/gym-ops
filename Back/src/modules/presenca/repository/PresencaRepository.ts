import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import Presenca from "../models/Presenca";
import { isSameDay } from "date-fns";

@injectable()
export class PresencaRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(id: number): Promise<Presenca> {
    const query = `
      INSERT INTO presenca (aluno_id)
      VALUES (?)
      RETURNING id, aluno_id, data;
    `;

    const result = await this.db.raw(query, [id]);
    return Presenca.fromDatabase(result.rows[0]);
  }

  async presenceAlredyExists(
    aluno_id: number,
    adm_id: number,
  ): Promise<boolean> {
    const query = `
    SELECT presenca.* 
    FROM presenca 
    JOIN alunos ON presenca.aluno_id = alunos.id
    WHERE aluno_id = ? AND alunos.adm_id = ?
    ORDER BY data DESC
    LIMIT 1;`;

    const result = await this.db.raw(query, [aluno_id, adm_id]);

    if (result.rows.length === 0) {
      return false;
    }
    return isSameDay(result.rows[0].data, new Date());
  }

  async findByAlunoId(aluno_id: number, adm_id: number): Promise<Presenca[]> {
    const query = `
    SELECT presenca.* 
    FROM presenca 
    JOIN alunos ON presenca.aluno_id = alunos.id
    WHERE aluno_id = ? AND alunos.adm_id = ?;
    `;

    const result = await this.db.raw(query, [aluno_id, adm_id]);

    return result.rows.map((presencaData: any) =>
      Presenca.fromDatabase(presencaData),
    );
  }

  async findById(id: number, adm_id): Promise<Presenca | null> {
    const query = `
    SELECT presenca.* 
    FROM presenca 
    JOIN alunos ON presenca.aluno_id = alunos.id
    WHERE presenca.id = ? AND alunos.adm_id = ?;
    `;

    const result = await this.db.raw(query, [id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Presenca.fromDatabase(result.rows[0]);
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM presenca WHERE id = ?";
    await this.db.raw(query, [id]);
  }
}
