import Peer from "peerjs";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const LOCAL_URL = "http://localhost:9001";

const socket = io(LOCAL_URL);

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [myPeer, setMyPeer] = useState();
  const [myStream, setMyStream] = useState();
  const [peers, setPeers] = useState();

  useEffect(() => {
    socket.on("connected", (myId) => {
      console.log("connected", myId);
      setMyPeer(new Peer(myId, { serialization: "json" }));
    });

    myPeer?.on("open", (myId) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((currentStream) => {
          setMyStream(currentStream);
          //triggers when someone joined the room
          socket.on("user-joined", ({ userId }) => {
            const call = myPeer.call(userId, currentStream);

            console.log(call);

            call.on("stream", (userVideoStream) => {
              peers
                ? setPeers([
                    ...peers,
                    { stream: userVideoStream, userId, call },
                  ])
                : setPeers([{ stream: userVideoStream, userId, call }]);
            });
          });

          myPeer.on("call", (call) => {
            call.answer(currentStream);

            call.on("stream", (userVideoStream) => {
              peers
                ? setPeers([
                    ...peers,
                    { stream: userVideoStream, userId: call.peer, call },
                  ])
                : setPeers([
                    { stream: userVideoStream, userId: call.peer, call },
                  ]);
            });
          });
        })
        .catch((err) => console.log(err));
    });
  }, [myPeer]);

  const providerValue = { myStream, peers, socket };

  return (
    <SocketContext.Provider value={providerValue}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocketCtx = () => {
  const ctx = useContext(SocketContext);

  if (ctx) {
    return ctx;
  }
};

export { SocketProvider, useSocketCtx };
