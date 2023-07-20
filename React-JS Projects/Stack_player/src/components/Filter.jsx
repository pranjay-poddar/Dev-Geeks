import React,{useState} from "react";

function Filter() {
    const [value,setValue] = useState('');
  const handleChange = (e) => {
            setValue(e.target.value)
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search from list.."
        value = {value}
        style={{
          padding: "10px 10px",
          outline: "none",
          width: "96%",
          margin: "auto",
        }}
        onChange={handleChange}
      />
    </div>
  );
}

export default Filter;
