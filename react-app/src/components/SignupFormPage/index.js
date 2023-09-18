import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import samazonLogo from './samazonblack.png';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [address, setAddress] = useState("");
  const emailPattern = /^.+@.+$/;

  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!emailPattern.test(email)) {
        setErrors((prevErrors) => [...prevErrors, "Please enter a valid email address."]);
        return;
    }

    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, address, password));
        if (data) {
            setErrors(data);
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
};


return (
  <div className="signup-modal">
      <img className='samazon-logo-signup' src={samazonLogo} alt="Samazon Logo" />
      <div className="signup-title">Create account</div>
      <form className="signup-form" onSubmit={handleSubmit}>
          {errors.length ? <ul className="errors-ul-signup">
              {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
              ))}
          </ul> : ""}
          <label className="signup-field">
              Email address
              <input className="input-field"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
          </label>
          <label className="signup-field">
              Username
              <input className="input-field"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
          </label>
          <label className="signup-field">
              Address
              <input className="input-field"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
              />
          </label>
          <label className="signup-field">
              Password
              <input className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
          </label>
          <label className="signup-field">
              Confirm Password
              <input className="input-field"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
          </label>
          <button className="signup-button grow" type="submit">Sign Up</button>
          <div className="terms-and-conditions">By creating an account, you agree to Samazon's <br /> Conditions of Use and Privacy Notice.</div>
      </form>
  </div>
);
}

export default SignupFormPage;
