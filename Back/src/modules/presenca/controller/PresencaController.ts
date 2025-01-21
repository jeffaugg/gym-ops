import { Request, Response } from "express";
import { PresencaService } from "../service/PresencaService";
import { container, injectable } from "tsyringe";

@injectable()
export class PresencaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;
    const presencaService = container.resolve(PresencaService);

    const presenca = await presencaService.create(Number(id), adm_id);
    return res.status(201).json(presenca);
  }

  async findByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const presencaService = container.resolve(PresencaService);

    const presencas = await presencaService.getFindByAlunoId(
      Number(id),
      adm_id,
    );
    return res.status(200).json(presencas);
  }

  async delele(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const adm_id = req.user.adm_id;

    const presencaService = container.resolve(PresencaService);

    await presencaService.delete(Number(id), adm_id);
    return res.status(204).json();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;

    const presencaService = container.resolve(PresencaService);
    const presencas = await presencaService.getAll(adm_id);
    return res.status(200).json(presencas);
  }
}
