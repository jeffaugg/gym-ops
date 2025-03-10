import { Request, Response } from "express";
import { RelatorioService } from "../service/RelatorioService";
import { container } from "tsyringe";
import { paginationSchema } from "../../../shared/infra/zod/paginationSchema";
import { pageWeekSchema as pageQuerySchema } from "../dto/pageWeekSchema";
import { start } from "repl";

export class RelatorioController {
  async balance(req: Request, res: Response) {
    const adm_id = req.user.adm_id;
    const start_date = new Date(req.query.start_date as string);
    const end_date = new Date(req.query.end_date as string);
    const relatorioService = container.resolve(RelatorioService);
    const balanco = await relatorioService.balance(
      adm_id,
      start_date,
      end_date,
    );
    return res.json(balanco);
  }

  async listByFrequency(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;
    const { page, limit } = paginationSchema.parse(req.query);
    const relatorioService = container.resolve(RelatorioService);

    const topFrequency = await relatorioService.listByFrequency(
      adm_id,
      page,
      limit,
    );
    return res.status(200).json(topFrequency);
  }

  async listRecentRecords(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;

    const { page, limit } = paginationSchema.parse(req.query);
    const relatorioService = container.resolve(RelatorioService);

    const recentRecords = await relatorioService.listRecentRecords(
      adm_id,
      page,
      limit,
    );

    return res.status(200).json(recentRecords);
  }

  async listRecentFrequency(req: Request, res: Response): Promise<Response> {
    const adm_id = req.user.adm_id;

    const { page, limit } = paginationSchema.parse(req.query);
    const relatorioService = container.resolve(RelatorioService);
    const recentRecords = await relatorioService.listRecentFrequency(
      adm_id,
      page,
      limit,
    );

    return res.status(200).json(recentRecords);
  }

  async instructorsListNow(req: Request, res: Response) {
    const relatorioService = container.resolve(RelatorioService);
    const { page, limit } = paginationSchema.parse(req.query);

    const adm_id = req.user.adm_id;
    const users = await relatorioService.listNow(adm_id, page, limit);
    return res.status(200).json(users);
  }

  async listWeekFrequencies(req: Request, res: Response) {
    const relatorioService = container.resolve(RelatorioService);
    const start_date = new Date(req.query.start_date as string);
    const end_date = new Date(req.query.end_date as string);

    const adm_id = req.user.adm_id;
    const metrics = await relatorioService.listWeekFrequencies(
      adm_id,
      start_date,
      end_date,
    );
    return res.status(200).json(metrics);
  }
}
