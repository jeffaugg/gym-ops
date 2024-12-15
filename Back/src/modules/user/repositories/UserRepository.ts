import User from "../models/User";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";
import { z } from "zod";
import { UserSchema } from "../dto/UserSchema";

@injectable()
export class UserRepository {
  constructor(@inject("Database") private db: Knex) {}

  public async create(data: z.infer<typeof UserSchema>): Promise<User> {
    const query = `INSERT INTO users (name, email, password, cpf, tel, role) 
    VALUES (?, ?, ?, ?, ?, ?) 
    RETURNING id, name, email, password, cpf, tel, role;`;
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
}

export default UserRepository;
