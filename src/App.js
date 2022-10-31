import "./App.css";
import { useState } from "react";
import validator from "validator";

function App() {
  const [error, setError] = useState();
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setError("");
    if (!validator.isEmail(signUpInput.email)) {
      return setError("The email you input is invalid");
    } else if (signUpInput.password.length < 5) {
      return setError("Password should be atleast 5 characters");
    }
    if (signUpInput.confirmPassword !== signUpInput.password) {
      return setError("passwords don't match");
    }
  };
  return (
    <div className="container my-5">
      <form action="">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            className="form-control"
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button
          className="btn btn-primary"
          title="submit"
          onClick={handleClick}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
