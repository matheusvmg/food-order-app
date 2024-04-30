import { Request, Response, response } from "express";
import { IUserService, UserService } from "../../service/User/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../../utils/email";

interface IUserController {
  registerUser(request: Request, response: Response): Promise<void>;
  login(request: Request, response: Response): Promise<void>;
  getAllUsers(request: Request, response: Response): Promise<void>;
  deleteUserById(request: Request, response: Response): Promise<void>;
  resetPassword(request: Request, response: Response): Promise<void>;
  forgetPassword(request: Request, response: Response): Promise<void>;
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
        const token = jwt.sign({ userId: user.user_id }, "secretKey", {
          expiresIn: "1h",
        });
        response.status(200).json({ token });
      } else {
        response.status(400).json({ message: "Email or password invalid!" });
      }
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not log in the user" });
    }
  };

  getAllUsers = async (
    _request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const users = await this.service.getAllUsers();
      response.status(200).json({ users });
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not get the users" });
    }
  };

  deleteUserById = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const id = request.params.id;
      await this.service.deleteUserById(id);
      response.status(204).send();
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not delete the user" });
    }
  };

  resetPassword = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const { email } = request.body;
      const isRegistered = await this.service.isEmailExists(email);
      if (!isRegistered) {
        response.status(404).json({ message: "Email not found" });
        return;
      }
      const token = crypto.randomBytes(20).toString("hex");
      await this.service.updateUserResetTokenByEmail(token, email);
      const messageResponse = await sendResetPasswordEmail(email, token);

      if (messageResponse.messageId) {
        response.status(200).json({
          message:
            "Check your email for instructions on resetting your password",
        });
      } else {
        response.status(500).json({ message: "Could not reset the password" });
      }
    } catch (e) {
      console.error(e);
      response.status(500).json({ message: "Could not reset the password" });
    }
  };

  forgetPassword = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const { token } = request.params;
    const { password } = request.body;
    const users = await this.service.getAllUsers();
    const user = users.find((u) => u.resettoken === token);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.service.updateUserPasswordByEmail(hashedPassword, user.email);
      await this.service.updateUserResetTokenByEmail(null, user.email);
      response.status(200).json({ message: "Password updated successfully" });
    } else {
      response.status(404).json({ message: "Invalid or expired token" });
    }
  };
}

export { IUserController, UserController };
