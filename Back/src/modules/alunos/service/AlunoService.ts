import { inject, injectable } from "tsyringe";
import { AlunoSchema } from "../dto/AlunoSchema";
import { z } from "zod";
import AppError from "../../../shared/errors/AppError";
import { getPaginationOffset } from "../../../shared/helpers/getPaginationOffset";
import { IAlunoRepository } from "../Interface/IAlunoRepository";
import { IPlanoRepository } from "../../planos/interface/IPlanoRepository";
import { IUserRepository } from "../../user/interface/IUserRepository";

@injectable()
export class AlunoService {
  constructor(
    @inject("AlunoRepository")
    private alunoRepository: IAlunoRepository,
    @inject("PlanoRepository")
    private planoRepository: IPlanoRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async create(data: z.infer<typeof AlunoSchema>, adm_id: number) {
    const admById = await this.userRepository.findAdmById(adm_id);

    if (!admById || admById.role != "ADM") {
      throw new AppError("Administrador inválido", 404);
    }

    const alunoByEmail = await this.alunoRepository.findByEmail(
      data.email,
      adm_id,
    );

    if (alunoByEmail) {
      const error = alunoByEmail.status
        ? "Email já cadastrado"
        : "Usuário com email já existe, por favor recupere o registro";

      throw new AppError(error, 409);
    }

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf, adm_id);

    if (userByCpf) {
      const error = userByCpf.status
        ? "Cpf já cadastrado"
        : "Usuário com cpf já existe, por favor recupere o registro";

      throw new AppError(error, 409);
    }

    const plano = await this.planoRepository.findById(data.plan_id, adm_id);

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    if (!data.health_notes || data.health_notes.length < 1) {
      data.health_notes = null;
    }

    const alunoData = { ...data, adm_id };

    return await this.alunoRepository.create(alunoData);
  }

  async list(adm_id: number, limit: number, page: number) {
    const offset = getPaginationOffset(page, limit);

    return this.alunoRepository.list(adm_id, limit, offset);
  }

  async update(id: number, adm_id: number, data: z.infer<typeof AlunoSchema>) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    const plano = await this.planoRepository.findById(data.plan_id, adm_id);

    const userByCpf = await this.alunoRepository.findByCpf(data.cpf, adm_id);
    if (user.cpf != data.cpf && userByCpf) {
      throw new AppError("CPF já cadastrado", 409);
    }

    const userByEmail = await this.alunoRepository.findByEmail(
      data.email,
      adm_id,
    );

    if (user.email != data.email && userByEmail) {
      throw new AppError("Email já cadastrado", 409);
    }

    if (!plano) {
      throw new AppError("Plano não encontrado", 404);
    }

    return await this.alunoRepository.update(id, adm_id, data);
  }

  async findById(id: number, adm_id: number) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async delete(id: number, adm_id: number) {
    const user = await this.alunoRepository.findById(id, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return await this.alunoRepository.delete(id, adm_id);
  }

  async findByCpf(cpf: string, adm_id: number) {
    const user = await this.alunoRepository.findByCpf(cpf, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }

  async findByEmail(email: string, adm_id: number) {
    const user = await this.alunoRepository.findByEmail(email, adm_id);

    if (!user) {
      throw new AppError("Aluno não encontrado", 404);
    }

    return user;
  }
}
