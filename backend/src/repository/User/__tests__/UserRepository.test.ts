import { DBClient } from "../../../dataSource/DBClient";
import {
  getUserPassword,
  isEmailExists,
  registerUser,
} from "../../../dataSource/queries/userTable";
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
});
