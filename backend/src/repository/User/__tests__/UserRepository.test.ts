import { DBClient } from "../../../dataSource/DBClient";
import {
  getUserPassword,
  isEmailExists,
  registerUser,
  getUserByEmail,
  getAllUsers,
  deleteUserById,
  updateUserResetPasswordTokenByEmail,
  updateUserPasswordByEmail,
} from "../../../dataSource/queries/userTable";
import { User } from "../../../model/User";
import { IUserRepository, UserRepository } from "../UserRepository";

describe("UserRepository", () => {
  const sut: IUserRepository = new UserRepository();
  describe("isEmailExists", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Should return the email when email exist", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: ["test@test.com"] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.isEmailExists("test@test.com");

      expect(result).toBe("test@test.com");
      expect(queryFn).toHaveBeenCalledWith(isEmailExists, ["test@test.com"]);
    });

    test("Should return undefined when does not exist", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.isEmailExists("test@test.com");

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(isEmailExists, ["test@test.com"]);
    });
  });

  describe("register", () => {
    test("Should register an user successfully and return the obj information", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return {
          rows: [
            {
              user_id: "",
              name: "test",
              email: "test@test.com",
              password: "",
              resettoken: undefined,
            },
          ],
        };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.register("test", "test@test.com", "1234567890");

      expect(result).toStrictEqual({
        user_id: "",
        name: "test",
        email: "test@test.com",
        password: "",
        resettoken: undefined,
      });
      expect(queryFn).toHaveBeenCalledWith(registerUser, [
        "test",
        "test@test.com",
        "1234567890",
      ]);
    });

    test("Should return an error when register an user", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.register("test", "", "1234567890");

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(registerUser, [
        "test",
        "",
        "1234567890",
      ]);
    });
  });

  describe("getUserPassword", () => {
    test("Should return the user password when pass the email", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return { rows: [{ password: "dmdsoc" }] };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getUserPassword("test@test.com");

      expect(result).toStrictEqual({ password: "dmdsoc" });
      expect(queryFn).toHaveBeenCalledWith(getUserPassword, ["test@test.com"]);
    });

    test("Should return undefined when does not pass a valid email", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getUserPassword("notvalid@test.com.br");

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(getUserPassword, [
        "notvalid@test.com.br",
      ]);
    });
  });

  describe("getUserByEmail", () => {
    test("Should return the user object when pass the email", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return {
            rows: [new User("1234567890", "Test", "test@test.com", "")],
          };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getUserByEmail("test@test.com");

      expect(result).toStrictEqual(
        new User("1234567890", "Test", "test@test.com", "")
      );
      expect(queryFn).toHaveBeenCalledWith(getUserByEmail, ["test@test.com"]);
    });

    test("Should return undefined when does not pass a valid email", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getUserByEmail("notvalid@test.com.br");

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(getUserByEmail, [
        "notvalid@test.com.br",
      ]);
    });
  });

  describe("getAllUsers", () => {
    test("Should return a list of users when call getAllUsers method", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return {
            rows: [
              new User("1234567890", "Test", "test@test.com", ""),
              new User("1234567890", "Test", "test@test.com", ""),
              new User("1234567890", "Test", "test@test.com", ""),
            ],
          };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getAllUsers();

      expect(result).toStrictEqual([
        new User("1234567890", "Test", "test@test.com", ""),
        new User("1234567890", "Test", "test@test.com", ""),
        new User("1234567890", "Test", "test@test.com", ""),
      ]);
      expect(queryFn).toHaveBeenCalledWith(getAllUsers);
    });

    test("Should return an empty list of users when call getAllUsers method and there is no user in the database", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.getAllUsers();

      expect(result).toStrictEqual([]);
      expect(queryFn).toHaveBeenCalledWith(getAllUsers);
    });
  });

  describe("deleteUserById", () => {
    test("Should delete the user when pass the id to the deleteUserById method", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return {
            rows: [],
          };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.deleteUserById("1234567890");

      expect(result).toStrictEqual(undefined);
      expect(queryFn).toHaveBeenCalledWith(deleteUserById, ["1234567890"]);
    });
  });

  describe("updateUserResetTokenByEmail", () => {
    test("Should return the user object when pass the resetToken and email to updateUserResetTokenByEmail method", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return {
            rows: [
              new User("1234567890", "Test", "test@test.com", "", "skckls1234"),
            ],
          };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.updateUserResetTokenByEmail(
        "skckls1234",
        "test@test.com"
      );

      expect(result).toStrictEqual(
        new User("1234567890", "Test", "test@test.com", "", "skckls1234")
      );
      expect(queryFn).toHaveBeenCalledWith(
        updateUserResetPasswordTokenByEmail,
        ["skckls1234", "test@test.com"]
      );
    });

    test("Should return undefined when does not pass a valid resetToken and email to updateUserResetTokenByEmail method", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.updateUserResetTokenByEmail(
        "",
        "notvalid@test.com.br"
      );

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(
        updateUserResetPasswordTokenByEmail,
        ["", "notvalid@test.com.br"]
      );
    });
  });

  describe("updateUserPasswordByEmail", () => {
    test("Should return the user object when pass the new password and email to updateUserPasswordByEmail method", async () => {
      const queryFn = jest
        .fn()
        .mockImplementation((_query: string, _customParams: any[]) => {
          return {
            rows: [
              new User("1234567890", "Test", "test@test.com", "1234567890"),
            ],
          };
        });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.updateUserPasswordByEmail(
        "1234567890",
        "test@test.com"
      );

      expect(result).toStrictEqual(
        new User("1234567890", "Test", "test@test.com", "1234567890")
      );
      expect(queryFn).toHaveBeenCalledWith(updateUserPasswordByEmail, [
        "1234567890",
        "test@test.com",
      ]);
    });

    test("Should return undefined when does not pass a valid resetToken and email to updateUserResetTokenByEmail method", async () => {
      const queryFn = jest.fn().mockImplementation(() => {
        return { rows: [] };
      });

      jest.spyOn(DBClient.agent, "query").mockImplementation(queryFn);

      const result = await sut.updateUserPasswordByEmail(
        "",
        "notvalid@test.com.br"
      );

      expect(result).toBeUndefined();
      expect(queryFn).toHaveBeenCalledWith(updateUserPasswordByEmail, [
        "",
        "notvalid@test.com.br",
      ]);
    });
  });
});
