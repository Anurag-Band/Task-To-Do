import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Todo from "./Todo";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import db from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to listen to the database and fetch new todos as previous add data

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodos = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // No need to do setTodos if you're getting data from firebase database,
    //  it refreshes realtime itself
    // setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="app__container">
      <h1>Todo App</h1>
      <form>
        <FormControl sx={{ width: "50vw", mb: 2 }}>
          <InputLabel>
            {"✅"}Write Down Your Today's Task {"🚀"}
          </InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodos}
          variant="contained"
        >
          Add Todo
        </Button>
      </form>

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
