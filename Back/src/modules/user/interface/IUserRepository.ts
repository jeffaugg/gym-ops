import User from "../models/User";
import { z } from "zod";
import { UserSchema } from "../dto/UserSchema";

export interface IUserRepository {
  createAdm(data: z.infer<typeof UserSchema>): Promise<User>;
  createUser(
    data: z.infer<typeof UserSchema> & { adm_id: number },
  ): Promise<User>;
  getAllUsers(adm_id: number, offset: number, limit: number): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findAdmById(id: number): Promise<User | null>;
  findUserById(id: number, adm_id: number): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  getEmail(adm_id: number): Promise<string[]>;
  findUserByCref(cref: string, adm_id: number): Promise<User | null>;
  delete(id: number, adm_id: number): Promise<void>;
}
