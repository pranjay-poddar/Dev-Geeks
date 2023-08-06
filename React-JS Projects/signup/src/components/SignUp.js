import "./SignUp.css";
import { useState } from "react";

function SignUp() {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    CompanyName: "",
    MobileNumber: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = document.querySelector(".Error");
    error.innerText = "";
    if (data.FirstName === "") {
      window.alert("The FirstName Field is Empty");
      error.innerText = "*The FirstName Field is Empty";
    } else if (data.LastName === "") {
      window.alert("The LastName Field is Empty");
      error.innerText = "*The LastName Field is Empty";
    } else if (data.CompanyName === "") {
      window.alert("*The CompanyName Field is Empty");
      error.innerText = "The CompanyName Field is Empty";
    }
    // console.log(data.email, data.FirstName, data.LastName, data.MobileNumber);
    else if (!data.email.match(mailformat)) {
      window.alert("The EmailId is Invalid");

      error.innerText = "*The EmailId is Invalid";
    } else if (!data.MobileNumber.match(phoneNumber)) {
      window.alert("*Mobile Number is Invalid");
      error.innerText = "The Mobile Number is Invalid";
    } else {
      window.alert("SignUp Successful");
    }
  };
  const handleChange = (e) => {
    setData((previousState) => {
      console.log(e.target.name, e.target.value);
      return { ...previousState, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="d-flex flex-column  justify-content-center align-content-center container-lg w-50  border border-5 border-dark mt-5 mb-5 p-5 ms-3 rounded">
      <p className="display-4 p justify-content-center align-items-center ">
        {" "}
        SignUp{" "}
      </p>{" "}
      <form onSubmit={handleSubmit}>
        <div className="row mt-5 ">
          {" "}
          <span className="col-lg-4 col-sm-6 "> FirstName </span>{" "}
          <input
            type="text"
            name="FirstName"
            className="col-lg-8 col-sm-6"
            onChange={handleChange}
          />{" "}
        </div>{" "}
        <div className="row mt-5">
          {" "}
          <span className="col-lg-4 col-sm-6 "> LastName </span>{" "}
          <input
            type="text"
            name="LastName"
            className="col-lg-8 col-sm-6"
            onChange={handleChange}
          />{" "}
        </div>{" "}
        <div className="row mt-5">
          {" "}
          <span className="col-lg-4 col-sm-6 "> Company Name </span>{" "}
          <input
            type="text"
            name="CompanyName"
            className="col-lg-8 col-sm-6"
            onChange={handleChange}
          />{" "}
        </div>{" "}
        <div className="row mt-5">
          {" "}
          <span className="col-lg-4 col-sm-6 "> Mobile Number </span>{" "}
          <input
            type="text"
            name="MobileNumber"
            className="col-lg-8 col-sm-6"
            onChange={handleChange}
          />{" "}
        </div>{" "}
        <div className="row mt-5">
          {" "}
          <span className="col-lg-4 col-sm-6 "> Email </span>{" "}
          <input
            type="text"
            name="email" //this name is passed as key in data state object so both the names should be same
            className="col-lg-8 col-sm-6"
            onChange={handleChange}
          />{" "}
          <div>
            {" "}
            <span className="col-lg-4 Error col-sm-6 text-danger"> </span>{" "}
          </div>{" "}
        </div>{" "}
        <input type="submit" className="btn mt-5 bg-dark" value="Submit" />
      </form>{" "}
    </div>
  );
}
export default SignUp;
