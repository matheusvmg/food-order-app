import { DBClient } from "../../dataSource/DBClient";
import {
  getUserByEmail,
  getUserPassword,
  isEmailExists,
  registerUser,
} from "../../dataSource/queries/userTable";
import { User } from "../../model/User";

interface IHashedPassword {
  password: string;
}

interface IUserRepository {
  isEmailExists(email: string): Promise<string>;
  register(name: string, email: string, password: string): Promise<User>;
  getUserPassword(email: string): Promise<IHashedPassword>;
  getUserByEmail(email: string): Promise<User>;
}

class UserRepository implements IUserRepository {
  isEmailExists = async (email: string): Promise<string> => {
    return (await DBClient.agent.query(isEmailExists, [email])).rows[0];
  };

  register = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    return (await DBClient.agent.query(registerUser, [name, email, password]))
      .rows[0];
  };

  getUserPassword = async (email: string): Promise<IHashedPassword> => {
    return (await DBClient.agent.query(getUserPassword, [email])).rows[0];
  };

  getUserByEmail = async (email: string): Promise<User> => {
    return (await DBClient.agent.query(getUserByEmail, [email])).rows[0];
  };
}

export { UserRepository, IUserRepository, IHashedPassword };
