import React from "react";
import { useNavigate , Link} from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handelButtonClick = () => {
    navigate(`${props.redirectPath}`);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          SignUp App
        </Link>
      </div>
      <label className="my-3 mx-3">{props.displayQuery}</label>
      <button type="button" className="btn btn-success my-3 mx-3" onClick={handelButtonClick}>{props.buttonName}</button>
    </nav>
  );
};

export default Navbar;
