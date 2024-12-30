import { Request, Response } from "express";
import { PlanoSchema } from "../dto/PlanoSchema";
import { container, injectable } from "tsyringe";
import { PlanoService } from "../service/PlanoService";

@injectable()
export class PlanoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = PlanoSchema.parse(req.body);
    const adm_id = req.user.id;

    const planoService = container.resolve(PlanoService);

    const plan = await planoService.create(data, adm_id);
    return res.status(201).json(plan);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.id;
    const planoService = container.resolve(PlanoService);

    const planos = await planoService.list(adm_id);
    return res.status(200).json(planos);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = PlanoSchema.parse(req.body);
    const adm_id = req.user.id;

    const planoService = container.resolve(PlanoService);

    const plan = await planoService.update(Number(id), adm_id, data);
    return res.status(200).json(plan);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.id;
    const planoService = container.resolve(PlanoService);

    await planoService.delete(Number(id), adm_id);
    return res.status(204).json();
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.id;

    const planoService = container.resolve(PlanoService);

    const plan = await planoService.findById(Number(id), adm_id);
    return res.status(200).json(plan);
  }
}
