import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { SetAllSongs } from "../../redux/userSlice";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");
  const dispatch = useDispatch();
  const fileTypes = ["MP3"];
  const navigate = useNavigate();
  const [song, setSong] = React.useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    file: "",
  });

  const handleChange = (file) => {
    setSong({ ...song, file: file });
    console.log(file);
  };

  const onAdd = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post("/api/admin/add-song", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song added successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  const onEdit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      formData.append("_id", songId);
      const response = await axios.post("/api/admin/edit-song", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song updated successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (songId && songId !== "") {
      const existingSong = allSongs.find((s) => s._id === songId);
      setSong(existingSong);
    }
  }, [allSongs]);

  useEffect(() => {
    if (user) {
      if ((user?.isAdmin && !user.isAdmin) || !user?.isAdmin) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div>
      <div className="flex items-center gap-5">
        <i
          class="ri-arrow-left-line text-3xl"
          onClick={() => {
            navigate("/admin");
          }}
        ></i>
        <h1 className="text-3xl">{songId ? "Edit" : "Add"} Song</h1>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex flex-col gap-3 w-1/3 mt-5">
          <input
            type="text"
            placeholder="Title"
            value={song.title}
            onChange={(e) => {
              setSong({ ...song, title: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Artist"
            value={song.artist}
            onChange={(e) => {
              setSong({ ...song, artist: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Album"
            value={song.album}
            onChange={(e) => {
              setSong({ ...song, album: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Year"
            value={song.year}
            onChange={(e) => {
              setSong({ ...song, year: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Duration"
            value={song.duration}
            onChange={(e) => {
              setSong({ ...song, duration: e.target.value });
            }}
          />
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          {song.file && <h1 className="text-gray-500">{song.file.name}</h1>}
          <div className="flex justify-end">
            {songId && songId !== "" ? (
              <button
                className="text-white bg-orange-500 py-2 px-10 w-full"
                onClick={onEdit}
              >
                Update
              </button>
            ) : (
              <button
                className="text-white bg-orange-500 py-2 px-10 w-full"
                onClick={onAdd}
              >
                Add
              </button>
            )}
          </div>
        </div>

        <div>
          <img
            className="h-[500px]"
            src="https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditSong;
