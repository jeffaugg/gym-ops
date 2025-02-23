import React from "react";
import "./UserProfile.css";

function UserProfile({ name, email }) {
  return (
    <div className="user-profile">
      <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="User Avatar" className="avatar" />
      <div className="user-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
