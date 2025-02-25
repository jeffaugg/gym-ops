import React from "react";
import "./TopFrequentUsers.css";
import profilePic from "../../../../assets/images/profile2.webp";

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
            <img src={profilePic} alt={user.name} className="avatarF"/>
            <h5>{user.name}</h5>
            <p>{user.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFrequentUsers;
