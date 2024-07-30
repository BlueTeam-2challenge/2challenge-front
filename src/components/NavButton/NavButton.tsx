import "./NavButton.css";
import { ButtonLinkProps } from "./types";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavButton = (props: ButtonLinkProps) => {
  const [hover, setHover] = useState(false);
  // const location = useLocation();

  // const isActive = location.pathname === props.to;

  const buttonStyle = {
    backgroundColor: hover ? "#26C485" : "#EEE0CB",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div className="container">
      {/* precisa ser adicionado as rotas no app */}
      <Link
        to={props.to}
        style={buttonStyle}
        className="btn"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.label === "Logout" ? (
          <>
            <p className="btn-textPage">{props.label}</p>
            <img src={props.icon} alt="page-icon" className="btn-iconPage" />
          </>
        ) : (
          <>
            <img src={props.icon} alt="page-icon" className="btn-iconPage" />
            <p className="btn-textPage">{props.label}</p>
          </>
        )}
      </Link>
    </div>
  );
};

export default NavButton;
