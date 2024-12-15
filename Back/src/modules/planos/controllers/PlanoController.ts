import { Request, Response } from "express";
import { PlanoSchema } from "../dto/PlanoSchema";
import { container, injectable } from "tsyringe";
import { PlanoService } from "../service/PlanoService";

@injectable()
export class PlanoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, duration } = PlanoSchema.parse(req.body);

    const planoService = container.resolve(PlanoService);

    const plan = await planoService.create({ name, price, duration });
    return res.status(201).json(plan);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const planoService = container.resolve(PlanoService);

    const planos = await planoService.list();
    return res.status(200).json(planos);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, duration, spots } = PlanoSchema.parse(req.body);

    const planoService = container.resolve(PlanoService);

    const plan = await planoService.update(Number(id), {
      name,
      price,
      duration,
      spots,
    });
    return res.status(200).json(plan);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const planoService = container.resolve(PlanoService);

    await planoService.delete(Number(id));
    return res.status(204).json();
  }
}
