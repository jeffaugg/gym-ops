import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";
import Plano from "../models/Plano";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";

@injectable()
export class PlanoRepository {
  constructor(@inject("Database") private db: Knex) {}
  async create(
    data: z.infer<typeof PlanoSchema> & { adm_id: number },
  ): Promise<Plano> {
    const query = `
      INSERT INTO planos (name, adm_id, price, duration, spots)
      VALUES (?, ?, ?, ?, ?)
      RETURNING id, name, adm_id, price, duration, spots;
      `;

    const result = await this.db.raw(query, [
      data.name,
      data.adm_id,
      data.price,
      data.duration,
      data.spots,
    ]);
    return Plano.FormData(result.rows[0]);
  }

  async list(adm_id: number): Promise<Plano[]> {
    const query = "SELECT * FROM planos WHERE adm_id = ?";
    const result = await this.db.raw(query, [adm_id]);
    return result.rows.map((plano: any) => Plano.FormData(plano));
  }

  async findById(id: number, adm_id: number): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE id = ? AND adm_id = ?";
    const result = await this.db.raw(query, [id, adm_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return Plano.FormData(result.rows[0]);
  }

  async findByName(name: string, adm_id: number): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE name = ? AND adm_id = ?";
    const result = await this.db.raw(query, [name, adm_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return Plano.FormData(result.rows[0]);
  }

  async findByDuration(
    duration: number,
    adm_id: number,
  ): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE duration = ? AND adm_id = ?";
    const result = await this.db.raw(query, [duration, adm_id]);
    if (result.rows.length === 0) {
      return null;
    }
    return Plano.FormData(result.rows[0]);
  }

  async update(
    id: number,
    data: z.infer<typeof PlanoSchema>,
    adm_id: number,
  ): Promise<Plano> {
    const query = `
    UPDATE planos
    SET name = ?, price = ?, duration = ?, spots = ?
    WHERE id = ? AND adm_id = ?
    RETURNING id, name, price, duration, spots;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.price,
      data.duration,
      data.spots,
      id,
      adm_id,
    ]);
    return Plano.FormData(result.rows[0]);
  }

  async delete(id: number, adm_id: number): Promise<void> {
    const query = "DELETE FROM planos WHERE id = ? AND adm_id = ?";
    await this.db.raw(query, [id, adm_id]);
  }
}
