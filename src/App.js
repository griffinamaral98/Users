import { useState } from "react";
import Form from "./components/Form";
import List from "./components/List";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const handleUserAdd = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="App">
      <Form onUserAdd={handleUserAdd} />
      <List users={users} />
    </div>
  );
}

export default App;
