import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import samazonLogo from './samazonblack.png';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <div className="login-modal">
			<img className='samazon-logo-login' src={samazonLogo} alt="Samazon Logo" />
      <h1>Sign in</h1>
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
        <button className="login-button grow" type="submit">Sign in</button>
				<div className="terms-and-conditions">By creating an account, you agree to Samazon's <br /> Conditions of Use and Privacy Notice.</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
