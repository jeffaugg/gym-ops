import User from "../models/User";
import { hash } from "bcryptjs";
import AppError from "../../../shared/errors/AppError";
import { createAccessToken } from "../../../shared/infra/http/helpers/CreateTokens";
import { SerializeUser } from "../../../shared/infra/http/helpers/SerializeUser";
import { inject, injectable } from "tsyringe";
import { Knex } from "knex";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  tel: string;
  role: string;
}
interface Response {
  serializedUser: SerializedUser;
  token: string;
}
@injectable()
export class UserRepository {
  constructor(@inject("Database") private db: Knex) {}

  public async create(
    name: string,
    email: string,
    password: string,
    role: string,
    tel: string,
  ): Promise<User> {
    if (await this.findByEmail(email)) {
      throw new AppError("Email ja existe", 400);
    }
    password = await hash(password, 8);
    console.log(typeof password);
    const query = `
        INSERT INTO users (name, email, password, role, tel) 
        VALUES (?, ?, ?, ?, ?) 
        RETURNING id, name, email, password, role, tel;
      `;
    const values = [name, email, password, role, tel];
    const result = await this.db.raw(query, values);
    const newUser = result.rows[0];
    return new User(
      newUser.id,
      newUser.name,
      newUser.email,
      newUser.tel,
      newUser.password,
      newUser.role,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = await this.db.raw(query, email);
    if (result.rows.length === 0) {
      return null; // Usuário não encontrado
    }

    const user = result.rows[0];
    return new User(
      user.id,
      user.name,
      user.email,
      user.tel,
      user.password,
      user.role,
    );
  }

  async login(email: string, password: string): Promise<Response> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new AppError("Credenciais invalidas", 401);
    }
    if (!(await user.checkPassword(password))) {
      throw new AppError("Credenciais invalidas", 401);
    }
    const token = createAccessToken(user);
    const serializedUser = await SerializeUser(user);

    return {
      serializedUser,
      token,
    };
  }

  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const result = await this.db.raw(query, id);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return User.fromDatabase(user);
  }
}

export default UserRepository;
