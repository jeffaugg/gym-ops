import { Request, Response } from "express";
import { RelatorioService } from "../service/RelatorioService";
import { container } from "tsyringe";

export class RelatorioController {
  async balance(req: Request, res: Response) {
    const relatorioService = container.resolve(RelatorioService);
    const balanco = await relatorioService.balance();
    return res.json(balanco);
  }
}
