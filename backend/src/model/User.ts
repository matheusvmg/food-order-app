class User {
  user_id: string;
  name: string;
  email: string;
  password: string;

  constructor(user_id: string, name: string, email: string, password: string) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export { User };
