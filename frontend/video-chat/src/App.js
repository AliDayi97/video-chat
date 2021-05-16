import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import ChatRoom from "./pages/ChatRoom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/create" />
        </Route>
        <Route path="/create" component={CreateRoom} />
        <Route path="/join" component={JoinRoom} />
        <Route path="/room" component={ChatRoom} />
      </Switch>
    </div>
  );
};

export default App;
