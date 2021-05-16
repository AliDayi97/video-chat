import User from "./User";
import Room from "./Room";
import { UserState } from "../interfaces/UserState";

export default class Rooms {
  rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  createRoom = (roomName: string, isPrivate: boolean, user: User): any => {
    if (this.exists(roomName)) {
      return {
        error:
          "Room with given name already exists, try joining that one or create a room with different name.",
      };
    }

    const room = new Room(roomName, isPrivate, user);
    this.rooms.push(room);

    user.updateState(UserState.InRoom);
    user.updateRoom(room);
    return { room };
  };

  joinRoom = (roomName: string, user: User): any => {
    const room = this.getRoomByName(roomName);
    if (!room) {
      return { error: "Room does not exist with given name" };
    }

    if (user.inRoom()) {
      return { error: `User is already in a room, ${user.room}` };
    }

    user.updateRoom(room);
    return { room };
  };

  deleteRoom = (room: Room) => {
    const currentRoom = this.rooms.find((r) => r.id === room.id);

    if (currentRoom) {
      //TODO:
      //check if members exist
      //check if admin
      //delete
    } else {
      return { error: "Room not found" };
    }
  };

  leaveRoom = (user: User, roomName: string) => {
    const room = this.getRoomByName(roomName);
    if (!room) {
      return { error: "Room does not exist with given name" };
    }

    if (user.inRoom() && user.room === room) {
      user.updateRoom(undefined);
      user.updateState(UserState.Connected);
      return true;
    }

    return { error: `User is not in the given room` };
  };

  getRooms = () => this.rooms;

  getRoomById = (roomId: string) => this.rooms.find((r) => r.id === roomId);
  getRoomByName = (roomName: string) =>
    this.rooms.find((r) => r.name === roomName);

  exists = (roomName: string) =>
    this.rooms.find((r) => r.name === roomName) ? true : false;
}
