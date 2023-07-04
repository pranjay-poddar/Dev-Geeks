import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <img
          className="h-[500px]"
          src="https://img.freepik.com/premium-photo/3d-rendering-3d-illustration-red-black-music-note-icon-isolated-white-background-song-melody-tune-symbol-concept_640106-443.jpg?w=2000"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 w-96 p-5  ">
        <h1 className="text-3xl font-bold text-secondary">Welcome </h1>
        <hr />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="primary bg-primary" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-secondary underline">
          Already Registered ? Click Here To Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
