import React from "react";
import "./TopFrequentUsers.css";

function TopFrequentUsers({users}) {

  const sortedUsers = users
        .map((user, index) => ({
          ...user,
          rank: `${index + 1}th`, // Atribui um rank simples (1st, 2nd, 3rd, etc.)
        }))
        .sort((a, b) => b.total_presencas - a.total_presencas);

  return (
    <div className="top-frequent-users">
      <h4>Top 5 frequentadores</h4>
      <div className="user-cards">
        {sortedUsers.map((user, index) => (
          <div key={index} className="user-card">
            <img src="https://thumbs.dreamstime.com/b/linha-%C3%ADcone-do-preto-avatar-perfil-de-usu%C3%A1rio-121102131.jpg" alt={user.name} className="avatarF"/>
            <h5>{user.name}</h5>
            <p>{user.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFrequentUsers;
