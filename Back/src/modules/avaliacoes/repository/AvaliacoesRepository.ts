import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { AvaliacoesSchema } from "../dto/AvaliacaoSchema";
import { Avaliacao } from "../models/Avaliacao";
import { z } from "zod";

@injectable()
export class AvaliacoesRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(
    data: z.infer<typeof AvaliacoesSchema> & {
      id: number;
    },
  ): Promise<Avaliacao> {
    const query = `
    INSERT INTO avaliacoes (
    aluno_id, instructor_id, height, weight, fat_mass, lean_mass,left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING id, aluno_id, instructor_id, date, height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip;
`;
    const result = await this.db.raw(query, [
      data.aluno_id,
      data.id,
      data.height,
      data.weight,
      data.fat_mass || null,
      data.lean_mass || null,
      data.left_arm_relaxed || null,
      data.right_arm_relaxed || null,
      data.left_arm_contracted || null,
      data.right_arm_contracted || null,
      data.left_thigh || null,
      data.right_thigh || null,
      data.left_calf || null,
      data.right_calf || null,
      data.chest || null,
      data.abdomen || null,
      data.waist || null,
      data.hip || null,
    ]);

    return result.rows[0] as Avaliacao;
  }

  async list(
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Avaliacao[]> {
    const query = `
      SELECT 
        avaliacoes.*,
        jsonb_build_object(
          'id', alunos.id,
          'name', alunos.name,
          'cpf', alunos.cpf,
          'email', alunos.email,
          'tel', alunos.telephone
        ) AS aluno,
        jsonb_build_object(
          'id', users.id,
          'name', users.name,
          'email', users.email,
          'tel', users.tel,
          'role', users.role
        ) AS instrutor
      FROM 
        avaliacoes
      JOIN 
        alunos ON avaliacoes.aluno_id = alunos.id
      JOIN 
        users ON avaliacoes.instructor_id = users.id
      WHERE 
        alunos.adm_id = ?
      LIMIT ? OFFSET ?;
        `;

    const result = await this.db.raw(query, [adm_id, limit, offset]);

    return result.rows.map((avaliacaoData: any) => {
      const avaliacao = Avaliacao.fromDatabase(avaliacaoData);
      avaliacao.aluno_id = avaliacaoData.aluno; // Sem JSON.parse
      avaliacao.instructor_id = avaliacaoData.instrutor; // Sem JSON.parse
      return avaliacao;
    });
  }

  async findByAlunoId(
    aluno_id: number,
    adm_id: number,
    offset: number,
    limit: number,
  ): Promise<Avaliacao[]> {
    const query = `
      SELECT 
        a.*,
        f.foto_path
      FROM 
        avaliacoes a
      LEFT JOIN 
        fotos_avaliacoes f 
      ON 
        a.id = f.avaliacao_id
      JOIN 
        alunos al
      ON
        a.aluno_id = al.id
      WHERE 
        a.aluno_id = ? AND al.adm_id = ?
      OFFSET ? LIMIT ? 
    `;
    const result = await this.db.raw(query, [aluno_id, adm_id, offset, limit]);

    if (result.rows.length === 0) {
      return [];
    }

    const evaluationsMap = new Map<number, Avaliacao>();

    result.rows.forEach((row: any) => {
      if (!evaluationsMap.has(row.id)) {
        evaluationsMap.set(row.id, {
          ...row,
          photo: [],
        });
      }

      if (row.foto_path) {
        evaluationsMap.get(row.id).photo.push(row.foto_path);
      }
    });

    return Array.from(evaluationsMap.values()).map((data) =>
      Avaliacao.fromDatabase(data),
    );
  }

  async findById(id: string, adm_id: number): Promise<Avaliacao> {
    const query = `
    SELECT *
    FROM avaliacoes
    JOIN alunos
    ON avaliacoes.aluno_id = alunos.id
    WHERE avaliacoes.id = ? AND alunos.adm_id = ?;
    `;

    const result = await this.db.raw(query, [id, adm_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Avaliacao.fromDatabase(result.rows[0]);
  }

  async update(
    id: number,
    data: z.infer<typeof AvaliacoesSchema>,
  ): Promise<Avaliacao> {
    const query = `
    UPDATE avaliacoes SET height = ?, weight = ?, fat_mass = ?, lean_mass = ?, left_arm_relaxed = ?, right_arm_relaxed = ?, left_arm_contracted = ?, right_arm_contracted = ?, left_thigh = ?, right_thigh = ?, left_calf = ?, right_calf = ?, chest = ?, abdomen = ?, waist = ?, hip = ?
    WHERE id = ?
    RETURNING id, aluno_id, instructor_id, date, height, weight, fat_mass, lean_mass, left_arm_relaxed, right_arm_relaxed, left_arm_contracted, right_arm_contracted, left_thigh, right_thigh, left_calf, right_calf, chest, abdomen, waist, hip
    `;
    const result = await this.db.raw(query, [
      data.height,
      data.weight,
      data.fat_mass || null,
      data.lean_mass || null,
      data.left_arm_relaxed || null,
      data.right_arm_relaxed || null,
      data.left_arm_contracted || null,
      data.right_arm_contracted || null,
      data.left_thigh || null,
      data.right_thigh || null,
      data.left_calf || null,
      data.right_calf || null,
      data.chest || null,
      data.abdomen || null,
      data.waist || null,
      data.hip || null,
      id,
    ]);

    return result.rows[0] as Avaliacao;
  }

  async delete(id: number): Promise<void> {
    const query = `
    DELETE FROM avaliacoes WHERE id = ?;
    `;
    await this.db.raw(query, [id]);
  }
}
