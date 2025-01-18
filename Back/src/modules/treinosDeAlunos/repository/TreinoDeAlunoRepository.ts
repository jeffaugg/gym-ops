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

  async list(adm_id: number): Promise<TreinoDeAluno[]> {
    const query = `
      SELECT treinos_de_alunos.*
      FROM treinos_de_alunos
      JOIN alunos ON treinos_de_alunos.aluno_id = alunos.id
      WHERE alunos.adm_id = ?
    `;

    const result = await this.db.raw(query, [adm_id]);

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

  async findByAlunoId(aluno_id: number): Promise<TreinoDeAluno | null> {
    const query = "SELECT * FROM treinos_de_alunos WHERE aluno_id = ?";
    const result = await this.db.raw(query, [aluno_id]);

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as TreinoDeAluno;
  }

  async delete(treino_de_aluno_id: number): Promise<void> {
    const query = "DELETE FROM treinos_de_alunos WHERE id = ?";
    await this.db.raw(query, [treino_de_aluno_id]);
  }
}
