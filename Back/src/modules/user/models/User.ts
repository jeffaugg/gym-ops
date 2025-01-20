import { compare } from "bcryptjs";

class User {
  id: number;
  adm_id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel: string;
  role: string;
  cref?: string;
  date_of_birth?: string;
  gender?: string;

  constructor(
    id: number,
    adm_id: number,
    name: string,
    email: string,
    password: string,
    cpf: string,
    tel: string,
    role: string,
    cref?: string,
    gender?: string,
    date_of_birth?: string,
  ) {
    this.id = id;
    this.adm_id = adm_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.tel = tel;
    this.role = role;
    this.cref = cref;
    this.gender = gender;
    this.date_of_birth = date_of_birth;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  static fromDatabase(data: any): User {
    return new User(
      data.id,
      data.adm_id,
      data.name,
      data.email,
      data.password,
      data.cpf,
      data.tel,
      data.role,
      data.cref,
      data.gender,
      data.date_of_birth,
    );
  }
}

export default User;
