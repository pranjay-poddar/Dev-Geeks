import React from "react";
import "./Item.css";

const Item = ({
  id,
  item,
  list,
  setEdit,
  setEditId,
  setItem,
  setList,
  complete,
}) => {
  //Delete Item
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  //Mark Item completed
  const handleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };

  //Edit Item
  const handleItem = (id) => {
    const editItem = list.find((el) => el.id === id);
    setItem(editItem.item);
    setEdit(true);
    setEditId(id);
  };

  return (
    <div className="item">
      <input
        type="text"
        value={item}
        style={{
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "white",
          fontSize: "20px",
        }}
        className={complete ? "complete" : ""}
      />
      <img
        style={{ cursor: "pointer" }}
        src="https://img.icons8.com/emoji/36/000000/pencil-emoji.png"
        onClick={() => {
          const confirmBox = window.confirm("Do you want to edit this item?");
          if (confirmBox === true) {
            handleItem(id);
          }
        }}
        alt="edit item"
      />
      <img
        style={{ cursor: "pointer" }}
        onClick={() => handleComplete(id)}
        src="https://img.icons8.com/offices/40/000000/checked-2--v2.png"
        alt="mark item complete"
      />

      <img
        style={{ cursor: "pointer" }}
        onClick={() => {
          const confirmBox = window.confirm(
            "Are you sure you want to delete this item?"
          );
          if (confirmBox === true) {
            remove(id);
          }
        }}
        src="https://img.icons8.com/color/48/000000/trash.png"
        alt="delete item"
      />
    </div>
  );
};
export default Item;