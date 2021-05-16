import { UserState } from "../interfaces/UserState";
import IUser from "./../interfaces/User";
import Room from "./Room";

export default class User implements IUser {
  id: string;
  name: string;
  room?: Room;
  status: UserState;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.status = UserState.Connected;

    this.updateState.bind(this);
    this.updateRoom.bind(this);
  }

  public updateState = (state: UserState) => {
    this.status = state;
  };

  public updateRoom = (room: Room | undefined) => {
    this.room = room;
  };

  inRoom = () => this.status === UserState.InRoom;
}
