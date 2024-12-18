import { compare } from "bcryptjs";

class User {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel: string;
  role: string;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    cpf: string,
    tel: string,
    role: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.tel = tel;
    this.role = role;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  static fromDatabase(data: any): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.cpf,
      data.tel,
      data.role,
    );
  }
}

export default User;
