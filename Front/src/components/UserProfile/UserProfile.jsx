import React from "react";
import "./UserProfile.css";

function UserProfile({ name, email }) {
  return (
    <div className="user-profile">
      <img src="https://thumbs.dreamstime.com/b/linha-%C3%ADcone-do-preto-avatar-perfil-de-usu%C3%A1rio-121102131.jpg" alt="User Avatar" className="avatar" />
      <div className="user-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
