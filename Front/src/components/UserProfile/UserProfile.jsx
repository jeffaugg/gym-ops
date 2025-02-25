import React from "react";
import "./UserProfile.css";
import profilePic from "../../assets/images/profile.jpg";

function UserProfile({ name, email }) {
  return (
    <div className="user-profile">
      <img src={profilePic} alt="User Avatar" className="avatar" />
      <div className="user-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
