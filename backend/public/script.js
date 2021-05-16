const socket = io("/");
const peersArea = document.getElementById("peers-area");
const myArea = document.getElementById("my-area");
const peers = {};

const myPeer = new Peer(undefined, { serialization: "json" });

const myVideo = document.createElement("video");
myVideo.muted = true;

myPeer.on("open", (userId) => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });
      socket.emit("join-room", ROOM_ID, userId);
      addVideoStream(myVideo, stream, true);

      myPeer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        peers[call.peer] = { call, video };

        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });
    });
});

socket.on("user-disconnected", (userId) => {
  console.log("disconnect");
  if (peers[userId]) {
    peers[userId].call.close();
    peers[userId].video.remove();
  }
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });

  peers[userId] = { call, video };
  console.log(peers);
}

function addVideoStream(video, stream, myVideo = false) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  myVideo ? myArea.append(video) : peersArea.append(video);
}
