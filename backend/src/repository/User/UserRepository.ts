import { DBClient } from "../../dataSource/DBClient";
import {
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserPassword,
  isEmailExists,
  registerUser,
  updateUserPasswordByEmail,
  updateUserResetPasswordTokenByEmail,
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
  getAllUsers(): Promise<User[]>;
  deleteUserById(id: string): Promise<void>;
  updateUserResetTokenByEmail(
    resetToken: string | null,
    email: string
  ): Promise<User>;
  updateUserPasswordByEmail(password: string, email: string): Promise<User>;
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

  getAllUsers = async (): Promise<User[]> => {
    return (await DBClient.agent.query(getAllUsers)).rows;
  };

  deleteUserById = async (id: string): Promise<void> => {
    await DBClient.agent.query(deleteUserById, [id]);
  };

  updateUserResetTokenByEmail = async (
    resetToken: string | null,
    email: string
  ): Promise<User> => {
    return (
      await DBClient.agent.query(updateUserResetPasswordTokenByEmail, [
        resetToken,
        email,
      ])
    ).rows[0];
  };

  updateUserPasswordByEmail = async (
    password: string,
    email: string
  ): Promise<User> => {
    return (
      await DBClient.agent.query(updateUserPasswordByEmail, [password, email])
    ).rows[0];
  };
}

export { UserRepository, IUserRepository, IHashedPassword };
