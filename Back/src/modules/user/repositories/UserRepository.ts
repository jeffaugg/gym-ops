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
    const query = `INSERT INTO users (adm_id, name, email, password, cpf, tel, role, cref, gender, date_of_birth) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? , ?) 
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
      data.gender,
      data.date_of_birth,
    ]);
    return User.fromDatabase(result.rows[0]);
  }

  async getAllUsers(adm_id: number): Promise<User[]> {
    const query = `
      SELECT 
        users.*,
        jsonb_agg(
          jsonb_build_object(
            'id', dias.id,
            'day_week', dias.day_week
          )
        ) AS days,
        jsonb_build_object(
          'id', horarios.id,
          'start_time', horarios.start_time,
          'end_time', horarios.end_time
        ) AS turn
      FROM 
        users
      JOIN 
        cargo_horaria ON users.id = cargo_horaria.user_id
      JOIN 
        dias ON cargo_horaria.dia_id = dias.id
      JOIN 
        horarios ON cargo_horaria.horario_id = horarios.id
      WHERE 
        users.adm_id = ? AND users.role = 'USER'
      GROUP BY 
        users.id, horarios.id;
    `;

    const result = await this.db.raw(query, [adm_id]);

    return result.rows.map((row: any) => {
      const user = User.fromDatabase(row);
      user.daysofweek = row.days.map((day: any) => day.day_week);
      user.turntime = row.turn;
      return user;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await this.db.raw(query, email);
    if (result.rows.length === 0) {
      return null; // Usuário não encontrado
    }
    return User.fromDatabase(result.rows[0]);
  }

  async findAdmById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await this.db.raw(query, id);

    if (!result.rows || result.rows.length === 0) {
      return null;
    }
    return User.fromDatabase(result.rows[0]);
  }

  async findUserById(id: number, adm_id: number): Promise<User | null> {
    const query = `
      SELECT 
        users.*,
        jsonb_agg(
          jsonb_build_object(
            'id', dias.id,
            'day_week', dias.day_week
          )
        ) AS days,
        jsonb_build_object(
          'id', horarios.id,
          'start_time', horarios.start_time,
          'end_time', horarios.end_time
        ) AS turn
      FROM 
        users
      JOIN 
        cargo_horaria ON users.id = cargo_horaria.user_id
      JOIN 
        dias ON cargo_horaria.dia_id = dias.id
      JOIN 
        horarios ON cargo_horaria.horario_id = horarios.id
      WHERE 
        users.adm_id = ? AND users.id = ? AND users.role = 'USER'
      GROUP BY 
        users.id, horarios.id;
    `;
    const result = await this.db.raw(query, [adm_id, id]);

    if (
      !result.rows ||
      !Array.isArray(result.rows) ||
      result.rows.length === 0
    ) {
      return null;
    }

    return result.rows.map((row: any) => {
      const user = User.fromDatabase(row);
      user.daysofweek = row.days.map((day: any) => day.day_week);
      user.turntime = row.turn;
      return user;
    });
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

  async delete(id: number, adm_id: number): Promise<void> {
    const query = "DELETE FROM users WHERE id = ? AND adm_id = ?;";
    await this.db.raw(query, [id, adm_id]);
  }
}

export default UserRepository;
