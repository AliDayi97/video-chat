import Room from "./Room";
import { UserState } from "./UserState";

export default interface User {
  id: string;
  name: string;
  room?: Room;
  status: UserState;
}
