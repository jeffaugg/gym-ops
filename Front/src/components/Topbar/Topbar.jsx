import React from "react";
import { IoMdNotifications } from "react-icons/io";
import "./Topbar.css";
import gymLogo from '../../assets/images/logo.png';

function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <img src={gymLogo} alt="Gym Logo" />
      </div>
      <div className="notification">
        <IoMdNotifications size={34} />
      </div>
    </div>
  );
}

export default Topbar;
