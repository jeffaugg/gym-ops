import AppError from "../../../shared/errors/AppError";
import { AlunoRepository } from "../../alunos/repository/AlunoRepository";
import UserRepository from "../../user/repositories/UserRepository";

export class GetEmailsByRecipientTypeService {
  constructor(
    private alunoRepository: AlunoRepository,
    private userRepository: UserRepository,
  ) {}

  async get(recipientType: string, userId: number): Promise<string[]> {
    switch (recipientType) {
      case "STUDENTS":
        return await this.alunoRepository.getEmail(userId);
      case "INSTRUCTORS":
        return await this.userRepository.getEmail(userId);
      case "ALL":
        const studentsEmail = await this.alunoRepository.getEmail(userId);
        const instructorsEmail = await this.userRepository.getEmail(userId);
        return [...studentsEmail, ...instructorsEmail];
      default:
        throw new AppError("Tipo de destinatário inválido", 400);
    }
  }
}
