import User from "../interfaces/User";
import IRoom from "./../interfaces/Room";
import uuid = require("uuid");

export default class Room implements IRoom {
  id: string;
  name: string;
  members: User[];
  admin: User;
  isPrivate: boolean;
  password?: string | undefined;

  constructor(name: string, isPrivate: boolean, creator: User) {
    this.id = uuid.v4();
    this.name = name;
    this.admin = creator;
    this.isPrivate = isPrivate;
    this.members = new Array<User>(creator);

    if (isPrivate) {
      this.password = "test";
    }
  }

  joinRoom = (member: User) => {
    if (this.inRoom(member)) {
      return { error: "Member already in the room" };
    }
    this.members.push(member);

    return { members: this.members };
  };

  leaveRoom = () => {};

  inRoom = (member: User) =>
    this.members.find((m) => m.id === member.id) ? true : false;

  memberCount = () => this.members.length;
}
