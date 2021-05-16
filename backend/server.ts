import express = require("express");
import cors = require("cors");
const app = express();
import { createServer } from "http";
// const server = new http.Server(app);
import { Server, Socket } from "socket.io";
import Rooms from "./js/Rooms";
import Users from "./js/Users";
import User from "./js/User";
const httpServer = createServer(app);

const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = new Server(httpServer, options);

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Successfully sent request");
});

app.get("/:room", (req, res) => {
  res.send({ roomId: req.params.room });
  // res.render("room", { roomId: req.params.room });
});

const RoomsInstance = new Rooms();
const UsersInstance = new Users();

const handleJoin = (
  socket: Socket,
  roomName: string,
  userName: string,
  cb: any
) => {
  var roomExists = RoomsInstance.exists(roomName);

  if (roomExists) {
    const { error, user } = UsersInstance.add(socket.id, userName);
    if (error) {
      console.log("Error while joining to room: ", error);
      cb({ error });
    } else {
      const { error, room } = RoomsInstance.joinRoom(roomName, user!);

      if (error) {
        console.log("Error while joining room, ", error);
        cb({ error });
        return;
      }

      socket.join(room.id);
      socket.broadcast.to(room.id).emit("user-joined", { userId: user!.id });

      console.log("Joined room successfully");
      cb({ success: true });
    }
  } else {
    cb({ error: "Room does not exist with given name" });
  }
};

const handleCreateRoom = (
  socket: Socket,
  roomName: string,
  userName: string,
  cb: any
) => {
  var roomExists = RoomsInstance.exists(roomName);
  if (roomExists) {
    cb({ error: "The room already created, try joining" });
  } else {
    const { error, user } = UsersInstance.add(socket.id, userName);
    if (error) {
      console.log(error);
      cb({ error });
    } else {
      const { error, room } = RoomsInstance.createRoom(roomName, false, user!);

      if (error) {
        console.log(error);
        console.log("here");
        cb({ error });
      } else {
        socket.join(room.id);
        cb({ roomId: room.id });
        console.log("Created room successfllly");
      }
    }
  }
};

const handleDisconnect = (socket: Socket) => {
  const user = UsersInstance.getUser(socket.id);
  if (user && user.room) {
    const roomName = user.room.name;
    socket.broadcast.to(roomName).emit("user-disconnected", socket.id);
  }
};

io.on("connection", (socket) => {
  const userId = socket.id;

  //to set up peer with socket id
  socket.emit("connected", userId);

  socket.on("create-room", (roomName, userName, cb) => {
    handleCreateRoom(socket, roomName, userName, cb);
  });

  //TODO: accept room/user id rather than name
  socket.on("join-room", (roomName, userName, cb) => {
    handleJoin(socket, roomName, userName, cb);
  });

  socket.on("disconnect", () => {
    handleDisconnect(socket);
    // const roomId = "123"; //getUser(userId).roomId;
    // socket.broadcast.to(roomId).emit("user-disconnected", userId);
  });
});

const PORT = process.env.PORT || 9001;

httpServer.listen(PORT, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    PORT,
    app.settings.env
  );
});
