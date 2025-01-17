import { inject, injectable } from "tsyringe";
import { DiaDaSemanaRepository } from "../repository/DiaDaSemanaRepository";
import { HorarioDeTurnoRepository } from "../repository/HorarioDeTurnoRepository";
import { CargoHorariaRepository } from "../repository/CargoHorariaRepository";

@injectable()
export class CargoHorariaService {
  constructor(
    @inject(DiaDaSemanaRepository)
    private diaDaSemanaRepository: DiaDaSemanaRepository,
    @inject(HorarioDeTurnoRepository)
    private horarioDeTurnoRepository: HorarioDeTurnoRepository,
    @inject(CargoHorariaRepository)
    private cargoHorariaRepository: CargoHorariaRepository,
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

  async listNow(admin_id: number) {
    return await this.cargoHorariaRepository.listNow(admin_id);
  }
}
