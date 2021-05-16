import User from "./User";

export default class Users {
  users: User[];

  constructor() {
    this.users = [];
    console.log("Users initialised");
  }

  add = (id: string, name: string): { error?: string; user?: User } => {
    if (this.existsByName(id)) {
      console.log("User exists");
      return { error: "User already exists" };
    }

    const user = new User(id, name);
    this.users.push(user);
    return { user };
  };

  remove = (id: string) => {
    if (this.existsById(id)) {
      const newUsers = this.users.filter((u) => u.id !== id);
      this.users = newUsers;
      return newUsers;
    }
    return { error: "User already exists" };
  };

  getUser = (id: string) => {
    const user = this.users.find((u) => u.id === id);
    return user;
  };

  //TODO: sort out confusion of which one should be unique (if user with same name in the room then don't allow ?)
  existsById = (userId: string) =>
    this.users.find((u) => u.id === userId) ? true : false;
  existsByName = (userName: string) =>
    this.users.find((u) => u.name === userName) ? true : false;
}
