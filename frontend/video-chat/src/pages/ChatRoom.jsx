import Grid from "@material-ui/core/Grid";
import React, { useEffect, useRef } from "react";
import { useSocketCtx } from "./../Contexts/SocketContext";

export default function ChatRoom() {
  const myVidRef = useRef();
  const peersGridRef = useRef();
  const { myStream, peers, socket } = useSocketCtx();

  useEffect(() => {
    myVidRef.current.srcObject = myStream;
  }, [myStream]);

  useEffect(() => {
    console.log(peers);

    //   <Grid item xs={3}>
    //       <video autoPlay/>
    //   </Grid>
  }, [peers]);

  return (
    <div>
      <Grid container ref={peersGridRef}>
        {peers &&
          peers.length > 0 &&
          peers.map((peer, i) => {
            const vidRef = React.createRef();
            vidRef.current.srcObject = peer.stream;

            return (
              <Grid item xs={3} key={peer.userId}>
                <video ref={vidRef} autoPlay />
              </Grid>
            );
          })}
      </Grid>
      <video ref={myVidRef} autoPlay muted />
    </div>
  );
}
