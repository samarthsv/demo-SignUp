import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import Styles from "../Styles/SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
  const [error , setError] = useState("")
  const navigate = useNavigate()
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log("password email", password, e.target.value);
    if (e.target.value !== "" && password !== "") {
      setButtonStatus(false);
    }
    else{
        setButtonStatus(true);
        }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log("password email", e.target.value, email);
    console.log(e.target.value !== "" && email !== "")
    if (e.target.value !== "" && email !== "") {
      setButtonStatus(false);
    }
    else{
    setButtonStatus(true);
    }
  };

  const handleLogInButton = async ()=>{
      try{
    const data = await axios.post("http://localhost:5000/user/login",{email,password})
    console.log(data.status)
    if (data.status === 200 && data.data.token){
        console.log(data.data)
        navigate("/welcome")
    }else{
        console.log(data.data)
        setError(data.data.err)
    }}
    catch(err){
        console.log(err.response.data.err)
        setError(err.response.data.err)
    }
  }
  return (
    <>
      <Navbar displayQuery="New user?" buttonName="SignUp" redirectPath="/" />
      <div className={Styles.container}>
          {error ? <b style={{"color": "red", "fontSize":"30px"}}>{error}</b> : <></>}
        <form>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={buttonStatus}
            onClick={handleLogInButton}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
