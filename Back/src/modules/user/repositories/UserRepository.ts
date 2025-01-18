import User from "../models/User";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";
import { z } from "zod";
import { UserSchema } from "../dto/UserSchema";

@injectable()
export class UserRepository {
  constructor(@inject("Database") private db: Knex) {}

  public async createAdm(data: z.infer<typeof UserSchema>): Promise<User> {
    const query = `INSERT INTO users (name, email, password, cpf, tel, role) 
    VALUES (?, ?, ?, ?, ?, ?) 
    RETURNING id, adm_id, name, email, password, cpf, tel, role;`;
    const result = await this.db.raw(query, [
      data.name,
      data.email,
      data.password,
      data.cpf,
      data.tel,
      data.role,
    ]);
    return User.fromDatabase(result.rows[0]);
  }

  public async createUser(
    data: z.infer<typeof UserSchema> & { adm_id: number },
  ): Promise<User> {
    const query = `INSERT INTO users (adm_id, name, email, password, cpf, tel, role, cref) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    RETURNING *;`;
    const result = await this.db.raw(query, [
      data.adm_id,
      data.name,
      data.email,
      data.password,
      data.cpf,
      data.tel,
      data.role,
      data.cref,
    ]);
    return User.fromDatabase(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await this.db.raw(query, email);
    if (result.rows.length === 0) {
      return null; // Usuário não encontrado
    }
    return User.fromDatabase(result.rows[0]);
  }

  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await this.db.raw(query, id);
    if (result.rows.length === 0) {
      return null;
    }
    return User.fromDatabase(result.rows[0]);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE cpf = ?";
    const result = await this.db.raw(query, [cpf]);
    if (result.rows.length === 0) {
      return null;
    }
    return User.fromDatabase(result.rows[0]);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const query = `UPDATE users SET name = ?, email = ?, password = ?, tel = ?, role = ? 
    WHERE id = ? 
    RETURNING *;`;
    const result = await this.db.raw(query, [
      data.name,
      data.email,
      data.password,
      data.tel,
      data.role,
      id,
    ]);
    return User.fromDatabase(result.rows[0]);
  }

  async getEmail(adm_id: number): Promise<string[]> {
    const query = `
    SELECT email 
    FROM users
    WHERE role = 'USER' AND adm_id = ?;`;
    const result = await this.db.raw(query, [adm_id]);
    return result.rows.map((row) => row.email);
  }

  async findUserByCref(cref: string, adm_id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE cref = ? AND adm_id = ?;";
    const result = await this.db.raw(query, [cref, adm_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return User.fromDatabase(result.rows[0]);
  }
}

export default UserRepository;
