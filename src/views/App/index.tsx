import * as React from "react";
import { Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi There!</h1>
        <Link to="/home">Home</Link>
      </div>
    );
  }
}

export default App;
