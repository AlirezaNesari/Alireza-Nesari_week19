import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      setError("");

      const data = await loginUser(formData);

      login(data.token);

      navigate("/products");
    } catch (error) {
      setError(
        error.response?.data?.message || "Invalid username or password"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={changeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={changeHandler}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;