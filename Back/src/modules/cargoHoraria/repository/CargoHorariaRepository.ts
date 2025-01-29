import { Knex } from "knex";
import { inject, injectable } from "tsyringe";
import { CargoHoraria } from "../models/CargoHoraria";
import User from "../../user/models/User";

interface ICargoHorariaCreate {
  user_id: number;
  dia_id: number;
  horario_id: number;
}

@injectable()
export class CargoHorariaRepository {
  constructor(@inject("Database") private db: Knex) {}

  async create(data: ICargoHorariaCreate): Promise<CargoHoraria> {
    const query = `INSERT INTO cargo_horaria (user_id, dia_id, horario_id) 
    VALUES (?, ?, ?)
    RETURNING user_id, dia_id, horario_id;
`;
    const result = await this.db.raw(query, [
      data.user_id,
      data.dia_id,
      data.horario_id,
    ]);

    return CargoHoraria.fromDatabase(result.rows[0]);
  }

  async delete(user_id: number): Promise<void> {
    const query = `DELETE FROM cargo_horaria WHERE user_id = ?;`;
    await this.db.raw(query, [user_id]);
  }

  async listNow(
    admin_id: number,
    offset: number,
    limit: number,
  ): Promise<CargoHoraria[]> {
    const query = `
      SELECT 
        *
      FROM
        users u
      JOIN
        cargo_horaria ch ON u.id = ch.user_id
      JOIN
        dias d ON d.id = ch.dia_id
      JOIN horarios h ON h.id = ch.horario_id
      WHERE
        u.role = 'USER'
        AND u.adm_id = ?
        AND d.day_week = to_char(now(), 'Day')
        AND h.start_time <= now()::time
        AND h.end_time >= now()::time
      LIMIT ? OFFSET ?;
    `;
    const result = await this.db.raw(query, [admin_id, limit, offset]);

    return result.rows.map((row) => User.fromDatabase(row));
  }
}
