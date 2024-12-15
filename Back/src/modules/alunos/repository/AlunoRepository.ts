import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { AlunoSchema } from "../dto/AlunoSchema";
import { Aluno } from "../models/Aluno";

@injectable()
export class AlunoRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: z.infer<typeof AlunoSchema>): Promise<Aluno> {
    const query = `
      INSERT INTO alunos (name, date_of_birth, email, telephone, cpf, plan_id, health_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING id, name, date_of_birth, email, telephone, cpf, plan_id, health_notes, created_at;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.date_of_birth,
      data.email,
      data.telephone,
      data.cpf,
      data.plan_id,
      data.health_notes,
    ]);

    return result.rows[0] as Aluno;
  }
  async list(): Promise<Aluno[]> {
    const query = "SELECT * FROM alunos";
    const result = await this.db.raw(query);

    return result.rows.map((alunoData: any) => Aluno.fromDatabase(alunoData));
  }

  async findById(id: number): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE id = ?";
    const result = await this.db.raw(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return Aluno.fromDatabase(result.rows[0]);
  }

  async findByEmail(email: string): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE email = ?";
    const result = await this.db.raw(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return Aluno.fromDatabase(result.rows[0]);
  }

  async findByCpf(cpf: string): Promise<Aluno | null> {
    const query = "SELECT * FROM alunos WHERE cpf = ?";
    const result = await this.db.raw(query, [cpf]);

    if (result.rows.length === 0) {
      return null;
    }
    const alunoData = result.rows[0];
    return Aluno.fromDatabase(alunoData);
  }

  async update(id: number, data: z.infer<typeof AlunoSchema>): Promise<Aluno> {
    const query = `
    UPDATE alunos SET name = ?, date_of_birth = ?, email = ?, telephone = ?, cpf = ?, plan_id = ?, health_notes = ? 
    WHERE id = ? 
    RETURNING id, name, date_of_birth, email, telephone, cpf, plan_id, health_notes, created_at `;

    const result = await this.db.raw(query, [
      data.name,
      data.date_of_birth,
      data.email,
      data.telephone,
      data.cpf,
      data.plan_id,
      data.health_notes,
      id,
    ]);

    return result.rows[0] as Aluno;
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM alunos WHERE id = ?";
    await this.db.raw(query, [id]);
  }

  async findByPlanId(plan_id: number): Promise<Aluno[] | null> {
    const query = "SELECT * FROM alunos WHERE plan_id = ?";
    const result = await this.db.raw(query, [plan_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows.map((alunoData: any) => Aluno.fromDatabase(alunoData));
  }
}
