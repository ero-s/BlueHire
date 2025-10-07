import React from "react";
import "./Greetings.css";

type GreetingsProps = {
  user: string;
};

const Greetings: React.FC<GreetingsProps> = ({ user }) => {
  return (
    <div className="greetings">
      <h2 className="greetings-title">
        Welcome back, <span className="greetings-user">{user}</span>!
      </h2>
      <p className="greetings-sub">
        Here's what's happening with your jobs today.
      </p>
    </div>
  );
};

export default Greetings;
