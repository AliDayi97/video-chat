import { Button, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSocketCtx } from "./../Contexts/SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.primary.dark,
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: theme.palette.secondary.dark,
    marginTop: "1em",
    marginBottom: ".5em",
  },
}));

const CreateRoom = ({ history }) => {
  const [username, setUsername] = useState();
  const [roomName, setRoomName] = useState();
  const [error, setError] = useState();

  const classes = useStyles();
  const { socket } = useSocketCtx();

  const createRoom = () => {
    if (username && roomName) {
      socket.emit("create-room", roomName, username, (data) => {
        console.log("Response: ", data);
        data.error ? setError(data.error) : setError("");
        history.push("/room");
      });
    } else {
      setError("Both fields needs to be filled");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="primary">
              Welcome
            </Typography>
            <Typography variant="h6" color="primary">
              to the ultimate chat experience
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <TextField
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <TextField
              label="Room Name"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} align="center" justify="center">
        <Grid item xs={4}>
          <Button variant="contained" onClick={createRoom}>
            Create Room
          </Button>
        </Grid>
        {/* <Grid item xs={4}>
          <Button variant="contained">Join Room</Button>
        </Grid> */}
        {error && (
          <Grid item xs={12}>
            <Paper>
              <Typography color="error">{error}</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CreateRoom;
