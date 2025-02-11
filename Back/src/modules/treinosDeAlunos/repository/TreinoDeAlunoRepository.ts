import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { TreinoDeAlunoSchema } from "../dto/TreinoDeAlunoSchema";
import { TreinoDeAluno } from "../models/TreinoDeAluno";

@injectable()
export class TreinoDeAlunoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof TreinoDeAlunoSchema>,
  ): Promise<TreinoDeAluno> {
    const query = `
      INSERT INTO treinos_de_alunos (aluno_id, treino_id)
      VALUES (?, ?)
      RETURNING id, aluno_id, treino_id;
    `;

    const result = await this.db.raw(query, [data.aluno_id, data.treino_id]);

    return TreinoDeAluno.fromDatabase(result.rows[0]);
  }

  async list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<TreinoDeAluno[]> {
    const query = `
      SELECT treinos_de_alunos.*
      FROM treinos_de_alunos
      JOIN alunos ON treinos_de_alunos.aluno_id = alunos.id
      WHERE alunos.adm_id = ?
      OFFSET ? LIMIT ?;
    `;

    const result = await this.db.raw(query, [adm_id, offset, limit]);

    return result.rows.map((treinoDeAlunoData: any) =>
      TreinoDeAluno.fromDatabase(treinoDeAlunoData),
    );
  }

  async findById(id: number): Promise<TreinoDeAluno | null> {
    const query = "SELECT * FROM treinos_de_alunos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as TreinoDeAluno;
  }

  async findByAlunoId(
    aluno_id: number,
    offset: number,
    limit: number,
  ): Promise<TreinoDeAluno | null> {
    const query =
      "SELECT * FROM treinos_de_alunos WHERE aluno_id = ? OFFSET ? LIMIT ? ";
    const result = await this.db.raw(query, [aluno_id, offset, limit]);

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TreinoDeAluno;
  }

  async doesRelationExist(
    aluno_id: number,
    treino_id: number,
    adm_id: number,
  ): Promise<boolean> {
    const query = `
    SELECT 1
    FROM treinos_de_alunos ta
    INNER JOIN treinos t ON ta.treino_id = t.id
    INNER JOIN alunos a ON ta.aluno_id = a.id
    WHERE (t.adm_id = ? OR a.adm_id = ?)
      AND ta.treino_id = ?
      AND ta.aluno_id = ?
    LIMIT 1;`;

    const result = await this.db.raw(query, [
      adm_id,
      adm_id,
      treino_id,
      aluno_id,
    ]);

    return result.rows.length > 0;
  }

  async delete(treino_de_aluno_id: number): Promise<void> {
    const query = "DELETE FROM treinos_de_alunos WHERE id = ?";
    await this.db.raw(query, [treino_de_aluno_id]);
  }
}
