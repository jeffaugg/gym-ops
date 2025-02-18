import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import Presenca from "../models/Presenca";
import { isSameDay } from "date-fns";
import {
  DayFrequency,
  IPresencaRepository,
} from "../interface/IPresencaRepository";

@injectable()
export class PresencaRepository implements IPresencaRepository {
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

  async getAll(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Presenca[]> {
    const query = `
    SELECT presenca.*,
    jsonb_build_object(
      'id', alunos.id,
      'name', alunos.name,
      'cpf', alunos.cpf
      ) AS aluno
    FROM presenca
    JOIN alunos ON presenca.aluno_id = alunos.id
    WHERE alunos.adm_id = ?
    OFFSET ? LIMIT ? 
    `;

    const result = await this.db.raw(query, [adm_id, offset, limit]);
    return result.rows.map((presencaData: any) => {
      const presenca = Presenca.fromDatabase(presencaData);
      presenca.aluno_id = presencaData.aluno;
      return presenca;
    });
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM presenca WHERE id = ?";
    await this.db.raw(query, [id]);
  }

  async listWeekFrequencies(
    adm_id: number,
    start_date: Date,
    end_date: Date,
  ): Promise<DayFrequency[]> {
    const query = `
    SELECT 
    DATE(presenca.data) AS dia,
    COUNT(*) AS total_presencas
  FROM presenca
  JOIN alunos 
    ON presenca.aluno_id = alunos.id
  WHERE DATE(presenca.data) BETWEEN ? AND ?
    AND alunos.adm_id = ?
  GROUP BY DATE(presenca.data)
  ORDER BY DATE(presenca.data) DESC;
    `;
    const result = await this.db.raw(query, [
      start_date.toISOString().split("T")[0],
      end_date.toISOString().split("T")[0],
      adm_id,
    ]);

    return result.rows as DayFrequency[];
  }
}
