import { Request, Response } from "express";
import { CargoHorariaService } from "../service/CargoHorariaService";
import { container, injectable } from "tsyringe";

@injectable()
export class CargoHorariaController {
  async listDayOfWeek(req: Request, res: Response) {
    const cargo_horariaService = container.resolve(CargoHorariaService);

    const dias = await cargo_horariaService.listDayOfWeek();
    return res.status(200).json(dias);
  }

  async listTurnTime(req: Request, res: Response) {
    const cargo_horariaService = container.resolve(CargoHorariaService);

    const horarios = await cargo_horariaService.listTurnTime();
    return res.status(200).json(horarios);
  }

  async listNow(req: Request, res: Response) {
    const cargo_horariaService = container.resolve(CargoHorariaService);

    const adm_id = req.user.adm_id;
    const users = await cargo_horariaService.listNow(adm_id);
    return res.status(200).json(users);
  }
}
