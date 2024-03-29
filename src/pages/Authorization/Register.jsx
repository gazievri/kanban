import "./authorization.scss";
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import React from "react";
import { mainApi } from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";

export const Register = ({ setCurrentUser, setIsLogged }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [passwordRepeatValid, setPasswordRepeatValid] = useState(false);

  const navigate = useNavigate();

  function handlePasswordRegistration(e) {
    let passwordInputValue = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      e.target.value
    );
    if (!passwordInputValue) {
      setPasswordError(
        "Minimum eight characters, at least one letter and one number:"
      );
    } else {
      setPasswordValid(true);
      setPasswordError("");
    }

    setPassword(e.target.value);
  }

  function handleCheckPasswordEqual(e) {
    let passwordRepeatValue = e.target.value;
    if (password === passwordRepeatValue) {
      console.log("test");
      setPasswordRepeatValid(true);
      setPasswordRepeatError("");
    } else setPasswordRepeatError("Entered passwords do not match");
  }

  function handleEmailRegistration(e) {
    let emailInputValue = /\S+@\S+\.\S+/.test(e.target.value);
    setEmailValid(emailInputValue);
    if (!emailInputValue) {
      setEmailError("Incorrectly entered Email");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function handleNameRegistration(e) {
    let nameInputValue = /^[a-zA-Zа-яА-Я-]{2,30}/.test(e.target.value);
    setNameValid(nameInputValue);
    if (!nameInputValue) {
      setNameError("Incorrectly entered Name");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      password: password,
      email: email,
    };
    mainApi.createUser(user).then((res) => {
      setIsLogged(true);
      setCurrentUser(res);
      navigate("/");
    });
  };

  return (
    <div className="authorization">
      <ThemeSwitcher />
      <div className="authorization__about">
        <NavLink to="/welcome">
          <svg
            id="Layer_1"
            className="header__hedghog authorization__hedhog"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 97.49"
          >
            <defs></defs>
            <title>hedgehog</title>
            <path
              className="welcome__hedhog"
              d="M17.88,38.29,10.76,24.08c-5.2-6.24,2-3.15,7.22-2.83L15.29,16c-1.2-2.34-.06-4.45,2.42-3.13l6.14,3.26,2.84-6.66c1.17-2.75,2.9-4.83,4.69-1.08l1,2,4-5.32c2.59-3.45,5.11-4.88,5.11.77V7.91l6-6C50.25-1,52.56-.72,51.77,3.74l-.72,4,8.39-5.81C62.68-.3,66.09-.95,63.83,4.42L62.72,7l5.7-3.43c3.62-2.18,5.32-1.77,4,2.82l-.55,1.85,2.44-1.43c7.78-4.55,6.76-3.17,6.14,3.9l7.74-4C91.61,5.18,91.7,8,91.7,10.28v3l5.51-2.61c2.14-.46,3.08.33,2.57,2.63l-2.57,6.65,6.57-1c2.44-.12,2.83,1.1,2.22,3l-2.15,4.5,5.74-1.26c2-.13,3.27.5,2.32,3.33l-2.3,4.8,7.11.16c2.34.3,3.31,1.22,1.35,3.47L113.5,43.2l8.25,5.09c1.76,1.32,1.32,2.47-.36,3.52l-7,3,7.79,6.33c1,2,.82,3.33-1.25,3.53l-4.62-.1,4,5c1,1.89.59,3.06-1.46,3.32l-50.3-6C55.13,64.1,45,57.42,39.92,44.41L45.44,40c1-1.5-1.95-2.36-3.64-2.6-1.07-.16-4.26,3.32-5.15,4.16L21,41.83c-1.34-.27-2.3-1.69-3.13-3.54Zm4.46,15.05a1.84,1.84,0,1,0,1.84,1.84,1.84,1.84,0,0,0-1.84-1.84Zm13.36-7c-4.62-1.61-14,1-18.57-.63-1.79,2.51-3.57,5.06-5.55,7.47S8,57.81,5,58.42c-2.08.41-5.84-.5-4.79,1.27,3,5.07,15.61,14.83,27.84,18.67L25.9,83.59c-2,8.09-4.43,5.47-7.54,9.77h18.3a56.59,56.59,0,0,1,8.22-10.07c12.55,4.1,35.07,8.62,49.51,6.38l-3.7,7.82,16.85-.62c3.07-1.45,2.92-16,5.35-20.35-14.66-.75-31.63-.93-45.61-3.9C50.19,69,45.93,65.09,38,50.38c-1.47-2.72-1.92-4-2.27-4.08Z"
            />
          </svg>
        </NavLink>
        <h1 className="authorization__title">Registration</h1>
      </div>
      <form action="" className="authorization__form" onSubmit={handleSubmit}>
        <div className="authorization__input-area">
          <p className="authorization__subtext">Name</p>
          <input
            className="authorization__input"
            id="name"
            name="name"
            type="name"
            onChange={handleNameRegistration}
            required
          />
        </div>
        <span className="authorization__input-error">{nameError}</span>

        <div className="authorization__input-area">
          <p className="authorization__subtext">E-mail</p>
          <input
            className="authorization__input"
            id="email"
            name="email"
            type="email"
            onChange={handleEmailRegistration}
            required
          />
        </div>
        <span className="authorization__input-error">{emailError}</span>
        <div className="authorization__input-area">
          <p className="authorization__subtext">Password</p>
          <input
            className="authorization__input"
            name="password"
            type="password"
            onChange={handlePasswordRegistration}
            required
          />
        </div>
        <span className="authorization__input-error">{passwordError}</span>
        <div className="authorization__input-area">
          <p className="authorization__subtext">Password Repeat</p>
          <input
            className="authorization__input"
            name="password-repeat"
            type="password"
            onChange={handleCheckPasswordEqual}
          />
        </div>
        <span className="authorization__input-error">
          {passwordRepeatError}
        </span>
      </form>

      <div className="authorization__buttons">
        <Button
          label={"Register"}
          isLarge
          fn={handleSubmit}
          disabled={
            nameValid === false ||
            emailValid === false ||
            passwordValid === false ||
            passwordRepeatValid === false
          }
        />
        <NavLink to="/login">
          <Button label={"Have accout? Go login"} isLarge />
        </NavLink>
      </div>
    </div>
  );
};
