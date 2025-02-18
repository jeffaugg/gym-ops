import { inject, injectable } from "tsyringe";
import { IDiaDaSemanaRepository } from "../interface/IDiaDaSemanaRepository";
import { IHorarioDeTurnoRepository } from "../interface/IHorarioDeTurnoRepository";
import { ICargoHorariaRepository } from "../interface/ICargoHorariaRepository";

@injectable()
export class CargoHorariaService {
  constructor(
    @inject("DiaDaSemanaRepository")
    private diaDaSemanaRepository: IDiaDaSemanaRepository,
    @inject("HorarioDeTurnoRepository")
    private horarioDeTurnoRepository: IHorarioDeTurnoRepository,
    @inject("CargoHorariaRepository")
    private cargoHorariaRepository: ICargoHorariaRepository,
  ) {}

  async listDayOfWeek() {
    return await this.diaDaSemanaRepository.list();
  }

  async listTurnTime() {
    return await this.horarioDeTurnoRepository.list();
  }

  async create(user_id: number, horario_id: number, dias_id: number[]) {
    const insercoes = dias_id.map((dia_id) => {
      return this.cargoHorariaRepository.create({
        user_id,
        dia_id,
        horario_id,
      });
    });
    return await Promise.all(insercoes);
  }

  async update(user_id: number, horario_id: number, dias_id: number[]) {
    await this.cargoHorariaRepository.delete(user_id);
    return await this.create(user_id, horario_id, dias_id);
  }
}
