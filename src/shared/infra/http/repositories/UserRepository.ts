import User from "../models/User";
import { hash, compare } from "bcryptjs";
import { db } from "../app";


export class UserRepository {
    
   
  
    // Método para adicionar um novo usuário
    async create(name: string, email:string, password:string, role:string): Promise<User> {
      // Antes de salvar, a senha é criptografada
      password = await hash(password, 8);
      
      const query = `
        INSERT INTO users (name, email, password, role) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, password, role;
      `;
      const values = [name, email, password, role];
  
      const result = await db.query(query, values);
  
      const newUser = result.rows[0];
      return new User(newUser.id, newUser.name, newUser.email, newUser.password, newUser.role);
    }
  
    // Método para buscar um usuário por ID
    async findById(id: number): Promise<User | null> {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await db.query(query, [id]);
  
      if (result.rows.length === 0) {
        return null; // Usuário não encontrado
      }
  
      const user = result.rows[0];
      return new User(user.id, user.name, user.email, user.password, user.role);
    }
  
    // Método para buscar um usuário por email
    async findByEmail(email: string): Promise<User | null> {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
  
      if (result.rows.length === 0) {
        return null; // Usuário não encontrado
      }
  
      const user = result.rows[0];
      return new User(user.id, user.name, user.email, user.password, user.role);
    }
  
    // Método para atualizar as informações de um usuário
    async update(id: number, user: User): Promise<User | null> {
      // Senha é criptografada antes de atualizar
      user.password = await hash(user.password, 8);
      
      const query = `
        UPDATE users
        SET name = $1, email = $2, password = $3, role = $4
        WHERE id = $5
        RETURNING id, name, email, password, role;
      `;
      const values = [user.name, user.email, user.password, user.role, id];
  
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return null; // Usuário não encontrado
      }
  
      const updatedUser = result.rows[0];
      return new User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password, updatedUser.role);
    }
  
    // Método para excluir um usuário
    async delete(id: number): Promise<boolean> {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await db.query(query, [id]);
      return result.rowCount > 0; // Retorna true se o usuário foi excluído
    }
  }

  export default UserRepository;