import React from "react";
import { Card } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./Todo.css";
import db from "./firebase";

const Todo = (props) => {
  return (
    <div className="todo__container">
      {/* <li>{props.text}</li> */}
      <Card sx={{ width: "45vw", mb: 2 }} variant="outlined">
        {"🎫"}
        {props.todo.todo}
      </Card>
      <DeleteForeverIcon
        style={{ color: "red", fontSize: 45, cursor: "pointer" }}
        onClick={(event) =>
          db
            .collection("todos")
            .doc(props.todo.id)
            .delete()
        }
      />
    </div>
  );
};

export default Todo;
