import { Request, Response } from "express";
import { PlanoSchema } from "../dto/PlanoSchema";
import { PlanoRepository } from "../repository/PlanoRepository";
import { container } from "tsyringe";

export class PlanoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, duration } = PlanoSchema.parse(req.body);

    const planoRepository = container.resolve(PlanoRepository);

    const plan = await planoRepository.create({ name, price, duration });
    return res.status(201).json(plan);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const planoRepository = container.resolve(PlanoRepository);

    const planos = await planoRepository.list();
    return res.status(200).json(planos);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, duration, spots } = PlanoSchema.parse(req.body);

    const planoRepository = container.resolve(PlanoRepository);

    const plan = await planoRepository.update(Number(id), {
      name,
      price,
      duration,
      spots,
    });
    return res.status(200).json(plan);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const planoRepository = container.resolve(PlanoRepository);

    await planoRepository.delete(Number(id));
    return res.status(204).json();
  }
}
