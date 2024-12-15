import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";
import Plano from "../models/Plano";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";

@injectable()
export class PlanoRepository {
  constructor(@inject("Database") private db: Knex) {}
  async create(data: z.infer<typeof PlanoSchema>): Promise<Plano> {
    const query = `
      INSERT INTO planos (name, price, duration, spots)
      VALUES (?, ?, ?, ?)
      RETURNING id, name, price, duration, spots;
      `;

    const result = await this.db.raw(query, [
      data.name,
      data.price,
      data.duration,
      data.spots,
    ]);
    const newPlano = result.rows[0];
    return Plano.FormData(newPlano);
  }

  async list(): Promise<Plano[]> {
    const query = "SELECT * FROM planos";
    const result = await this.db.raw(query);
    return result.rows.map(
      (plano: any) =>
        new Plano(
          plano.id,
          plano.name,
          plano.price,
          plano.duration,
          plano.spots,
        ),
    );
  }

  async findById(id: number): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE id = ?";
    const result = await this.db.raw(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const plano = result.rows[0];
    return Plano.FormData(plano);
  }

  async findByName(name: string): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE name = ?";
    const result = await this.db.raw(query, [name]);
    if (result.rows.length === 0) {
      return null;
    }
    const plano = result.rows[0];
    return Plano.FormData(plano);
  }

  async findByDuration(duration: number): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE duration = ?";
    const result = await this.db.raw(query, [duration]);
    if (result.rows.length === 0) {
      return null;
    }
    const plano = result.rows[0];
    return Plano.FormData(plano);
  }

  async update(id: number, data: z.infer<typeof PlanoSchema>): Promise<Plano> {
    const query = `
    UPDATE planos
    SET name = ?, price = ?, duration = ?, spots = ?
    WHERE id = ?
    RETURNING id, name, price, duration, spots;
    `;

    const result = await this.db.raw(query, [
      data.name,
      data.price,
      data.duration,
      id,
    ]);
    const updatedPlano = result.rows[0];
    return Plano.FormData(updatedPlano);
  }

  async delete(id: number): Promise<void> {
    const query = "DELETE FROM planos WHERE id = ?";
    await this.db.raw(query, [id]);
  }
}
