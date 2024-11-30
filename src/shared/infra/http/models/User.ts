
  import { hash, compare } from "bcryptjs";

  
  class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;

    constructor(id: number, name: string, email: string, password: string, role: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
    }  
    
  
    public async checkPassword(password: string): Promise<boolean> {
      return compare(password, this.password);
    };
  }
  
  export default User;
  