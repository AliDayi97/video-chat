import User from "./User";

export default interface Room {
  id: string;
  name: string;
  members: User[];
  admin: User;
  isPrivate: boolean;
  password?: string;
}
