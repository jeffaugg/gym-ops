import React from "react";
import "./TopFrequentUsers.css";

function TopFrequentUsers() {
  const users = [
    { name: "Jane Cooper", rank: "6th" },
    { name: "Jane Cooper", rank: "6th" },
    { name: "Jane Cooper", rank: "6th" },
    { name: "Jane Cooper", rank: "6th" },
    { name: "Jane Cooper", rank: "6th" },
  ];

  return (
    <div className="top-frequent-users">
      <h4>Top 5 frequentadores</h4>
      <div className="user-cards">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <img src="https://via.placeholder.com/50" alt={user.name} />
            <h5>{user.name}</h5>
            <p>{user.rank}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopFrequentUsers;
