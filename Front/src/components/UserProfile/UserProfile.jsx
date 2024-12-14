import React from "react";
import "./UserProfile.css";

function UserProfile({ name, email, avatar }) {
  return (
    <div className="user-profile">
      <img src={avatar} alt="User Avatar" className="avatar" />
      <div className="user-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
