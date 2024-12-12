import { compare } from "bcryptjs";

class User {
  id: number;
  name: string;
  email: string;
  password: string;
  tel: string;
  role: string;

  constructor(
    id: number,
    name: string,
    email: string,
    tel: string,
    password: string,
    role: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.tel = tel;
    this.password = password;
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
      data.tel,
      data.password,
      data.role,
    );
  }
}

export default User;
