import { z } from "zod";
import { PlanoSchema } from "../dto/PlanoSchema";
import db from "../../../shared/infra/http/config/database";
import Plano from "../models/Plano";
import AppError from "../../../shared/errors/AppError";
import { singleton } from "tsyringe";

@singleton()
export class PlanoRepository {
  async create(data: z.infer<typeof PlanoSchema>): Promise<Plano> {
    if (await this.findByName(data.name)) {
      throw new AppError("Plano já existe", 400);
    }

    const query = `
      INSERT INTO planos (name, price, duration)
      VALUES (?, ?, ?)
      RETURNING id, name, price, duration;
      `;

    const result = await db.raw(query, [data.name, data.price, data.duration]);
    const newPlano = result.rows[0];
    return new Plano(
      newPlano.id,
      newPlano.name,
      newPlano.price,
      newPlano.duration,
    );
  }

  async list(): Promise<Plano[]> {
    const query = "SELECT * FROM planos";
    const result = await db.raw(query);
    return result.rows.map(
      (plano: any) =>
        new Plano(plano.id, plano.name, plano.price, plano.duration),
    );
  }

  async findById(id: number): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE id = ?";
    const result = await db.raw(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const plano = result.rows[0];
    return new Plano(plano.id, plano.name, plano.price, plano.duration);
  }

  async findByName(name: string): Promise<Plano | null> {
    const query = "SELECT * FROM planos WHERE name = ?";
    const result = await db.raw(query, [name]);
    if (result.rows.length === 0) {
      return null;
    }
    const plano = result.rows[0];
    return new Plano(plano.id, plano.name, plano.price, plano.duration);
  }

  async update(id: number, data: z.infer<typeof PlanoSchema>): Promise<Plano> {
    if (!this.findById(id)) {
      throw new AppError("Plano não encontrado", 404);
    }

    const query = `
    UPDATE planos
    SET name = ?, price = ?, duration = ?
    WHERE id = ?
    RETURNING id, name, price, duration;
    `;

    const result = await db.raw(query, [
      data.name,
      data.price,
      data.duration,
      id,
    ]);
    const updatedPlano = result.rows[0];
    return new Plano(
      updatedPlano.id,
      updatedPlano.name,
      updatedPlano.price,
      updatedPlano.duration,
    );
  }

  async delete(id: number): Promise<Plano> {
    const result = await this.findById(id);

    if (!result) {
      throw new AppError("Plano não encontrado", 404);
    }
    const query = "DELETE FROM planos WHERE id = ?";
    await db.raw(query, [id]);
    return result;
  }
}
