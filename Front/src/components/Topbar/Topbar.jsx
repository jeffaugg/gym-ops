import React from "react";
import { IoMdNotifications } from "react-icons/io";
import gymLogo from '../../assets/images/logo.png';
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={gymLogo} alt="Gym Logo" />
      </div>
      <div className="notification">
        <IoMdNotifications size={24} />
      </div>
    </div>
  );
}

export default Topbar;
