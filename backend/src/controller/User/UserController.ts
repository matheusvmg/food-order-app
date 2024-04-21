import { Request, Response } from "express";
import { IUserService, UserService } from "../../service/User/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUserController {
  registerUser(request: Request, response: Response): Promise<void>;
  login(request: Request, response: Response): Promise<void>;
}

class UserController implements IUserController {
  service: IUserService;

  constructor(service: IUserService = new UserService()) {
    this.service = service;
  }

  registerUser = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const { name, email, password } = request.body;

      if (await this.service.isEmailExists(email)) {
        response.status(400).json({ message: "User already registered!" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.service.register(name, email, hashedPassword);

      response.status(201).json({ message: "User Registered!", user });
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not register the user" });
    }
  };

  login = async (request: Request, response: Response): Promise<void> => {
    try {
      const { email, password } = request.body;

      const user = await this.service.getUserByEmail(email);

      if (!this.service.isEmailExists(email)) {
        response.status(404).json({ message: "User is not registered!" });
        return;
      }

      const hashedPassword = await this.service.getUserPassword(email);
      const isPasswordValid = await bcrypt.compare(
        password.toString(),
        hashedPassword.password
      );

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.user_id }, "secretKey");
        response.status(200).json({ token });
      } else {
        response.status(400).json({ message: "Email or password invalid!" });
      }
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not log in the user" });
    }
  };
}

export { IUserController, UserController };
