import User from "../models/User";
import { hash, compare } from "bcryptjs";
import db from "../config/database";
import AppError from "../errors/AppError";
import {
  createAccessToken,
  createRefreshToken
} from "../helpers/CreateTokens";
import { SerializeUser } from "../helpers/SerializeUser";

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

export class UserRepository {
    
   constructor(){
    
   }

  public async create(name: string, email:string, password:string, role:string, tel:string): Promise<User> {
      if(await this.findByEmail(email)){
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
      const result = await db.raw(query, values);
      const newUser = result.rows[0];
      return new User(newUser.id, newUser.name, newUser.email, newUser.tel, newUser.password, newUser.role);
    
  }


  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const result = await db.raw(query, email);
    if (result.rows.length === 0) {
      return null; // Usuário não encontrado
    }

    const user = result.rows[0];
    return new User(user.id, user.name, user.email, user.tel, user.password, user.role);

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
  };
  




}

  export default UserRepository;