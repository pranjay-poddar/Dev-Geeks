import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetAllSongs, SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
 
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = React.useState(false);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post(
        "/api/users/get-user-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading())
      if (response.data.success) {
        dispatch(SetUser(response.data.data));
      } else {
        alert(response.data.message);
      }
      setReadyToRender(true);
    } catch (error) {
      dispatch(HideLoading())
      localStorage.removeItem("token");
      setReadyToRender(true);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user === null) {
      getUserData();
    }
  }, []);

  const getAllSongs = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/songs/get-all-songs",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(SetAllSongs(response.data.data));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSongs();
  }, []);
  return <div>{readyToRender && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
