import React, {useState} from "react";
import Navbar from "../Component/Navbar";
import Styles from "../Styles/SignUp.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [passwordConfirm , setPasswordConfirm] = useState("")
    const [buttonStatus , setButtonStatus] = useState(true)
    const [name , setName] = useState("")
    const [error , setError] = useState("")
    const navigate = useNavigate()
    const handleEmail = (e)=>{
        setEmail(e.target.value)
        if (e.target.value===""){
            setButtonStatus(true)
        }
    }

    const handleName = (e)=>{
        setName(e.target.value)
        if (e.target.value===""){
            setButtonStatus(true)
        }
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handlePasswordConfirm = (e)=>{
        setPasswordConfirm(e.target.value)
        console.log(passwordConfirm)
        if (password === e.target.value && email !== ""){
            console.log(passwordConfirm)
            setButtonStatus(false)
        }
        else{
            setButtonStatus(true)
        }
    }

    const handleSignInButton = async ()=>{
      try{
        const data = await axios.post("/user/register", {email , password , name})
        if (data.data){
            console.log("logged In")
            console.log(data.data)
            navigate("/welcome")
        }
      }catch(err){
        console.log(err.response.data.errors)
        setError(err.response.data.errors)
    }
    }
  return (
      <><Navbar displayQuery="Alread have an account" buttonName="LogIn" redirectPath="/login"/>
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
        <label htmlFor="inputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          placeholder="Jack"
          value={name}
          onChange={handleName}
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
      <div className="mb-3">
        <label htmlFor="inputConfirmPassword" className="form-label">
          Confim Password
        </label>
        <input
          type="password"
          className="form-control"
          id="inputConfirmPassword"
          placeholder="Password"
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
        />
      </div>
      <label><b>{password !== passwordConfirm ? "Password is not matching with Confirm Password" : ""}</b></label><br/>
      <button id="signIn-button" type="button" className="btn btn-primary" disabled={buttonStatus} onClick={handleSignInButton}>Sign In</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
