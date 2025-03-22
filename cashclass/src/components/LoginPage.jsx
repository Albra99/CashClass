import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Username state
  const navigate = useNavigate(); // Hook to navigate to the next page

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Navigate to the next page if the username is entered
      navigate("/home");
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to CashClass!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default LoginPage;
