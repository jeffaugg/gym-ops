import User from "../../../../modules/user/models/User";

interface SerializedUser {
  id: number;
  name: string;
  email: string;
  tel: string;
  role: string;
}

export const SerializeUser = async (user: User): Promise<SerializedUser> => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    tel: user.tel,
    role: user.role,
  };
};
