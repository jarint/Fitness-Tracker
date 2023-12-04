import "./Topbar.css";
import B_Back_arrow from "./icons/back_arrow.svg";
import { Link } from "react-router-dom";

function Topbar({ back, name }) {
  return (
    <div className="topbar">
      <Link className="back" to={"/" + back}>
        <img className="back_btn" src={B_Back_arrow} alt="Previous Page" />
        Back
      </Link>

      <div className="title">
        <h1>{name}</h1>
      </div>
    </div>
  );
}

export default Topbar;
