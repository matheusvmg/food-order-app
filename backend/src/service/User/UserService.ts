import { User } from "../../model/User";
import {
  IHashedPassword,
  IUserRepository,
  UserRepository,
} from "../../repository/User/UserRepository";

interface IUserService {
  isEmailExists(email: string): Promise<string>;
  register(name: string, email: string, password: string): Promise<User>;
  getUserPassword(email: string): Promise<IHashedPassword>;
  getUserByEmail(email: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
  deleteUserById(id: string): Promise<void>;
}

class UserService implements IUserService {
  repository: IUserRepository;

  constructor(repository: IUserRepository = new UserRepository()) {
    this.repository = repository;
  }

  isEmailExists = async (email: string): Promise<string> => {
    return await this.repository.isEmailExists(email);
  };

  register = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    return await this.repository.register(name, email, password);
  };

  getUserPassword = async (email: string): Promise<IHashedPassword> => {
    return await this.repository.getUserPassword(email);
  };

  getUserByEmail = async (email: string): Promise<User> => {
    return await this.repository.getUserByEmail(email);
  };

  getAllUsers = async (): Promise<User[]> => {
    return await this.repository.getAllUsers();
  };

  deleteUserById = async (id: string): Promise<void> => {
    await this.repository.deleteUserById(id);
  };
}

export { UserService, IUserService };
