import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import samazonLogo from './samazonblack.png';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-modal">
			<img className='samazon-logo-login' src={samazonLogo} alt="Samazon Logo" />
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {errors.length ? <ul className="error-ul">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> : ""}
        <label className="login-field">
          Email
          <input className="sign-in-input-modal"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-field">
          Password
          <input className="sign-in-input-modal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login-button grow" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
