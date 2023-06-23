import React from "react";

// The display of alert messages on the web page is handled by the following code

export default function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
        </div>
      )}
    </div>
  );
}
