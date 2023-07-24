// import react and its functions
import React, { useEffect, useState } from "react";
// import sign out from firebase auth
import { signOut } from "firebase/auth";
// import realtime database and auth from firebase
import { auth, db } from "../firebase.js";
// import router dom from navigation of webpages
import { useNavigate } from "react-router-dom";
// import uid dependency from creating uids to save data inside the database
import { uid } from "uid";
// import different function of firebase database
import { set, ref, onValue, remove, update } from "firebase/database";
// import todo_page css
import "./todo_page.css";
// importing material icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";

// making a todoPage function and returning the webpae at the end
export default function TodoPage() {
  // importing constant
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  // keep a check if user is logined then display its todo list else navigate him/her to the / page - login page
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  // sign out button to make the user sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add to dos to the user database
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });
    // set to do input as empty
    setTodo("");
  };

  // update the to do when called
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  // confirm the edit and save the editted text to the database
  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });
    // set todo input as empty
    setTodo("");
    // set editting as false
    setIsEdit(false);
  };

  // deletes the todo from the database
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  // returns the todo-page
  return (
    // todo-page div
    <div className="todo-page">
      {/* todo write */}
      <div className="todo-write">
        {/* todo input box */}
        <input
          className="add-edit-input"
          type="text"
          placeholder="Add todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {/* Check if the user is editingor not */}
        {isEdit ? (
          // if the user if editting
          <div>
            <CheckIcon
              onClick={handleEditConfirm}
              className="add-confirm-icon"
            />
          </div>
        ) : (
          // if the user is not editting
          <div>
            <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
            <LogoutIcon onClick={handleSignOut} className="logout-icon" />
          </div>
        )}
      </div>
      {/* display todos on the screen using map */}
      <div className="Todos">
      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <div className="edit-delete-div">
            {/* edit icon */}
            <EditIcon
              fontSize="large"
              onClick={() => handleUpdate(todo)}
              className="edit-button"
            />
            {/* delete icon */}
            <DeleteIcon
              fontSize="large"
              onClick={() => handleDelete(todo.uidd)}
              className="delete-button"
            />
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}