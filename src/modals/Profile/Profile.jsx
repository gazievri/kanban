import "./Profile.scss";
import { useState, useContext, useEffect } from "react";
import Dots from "../../images/dots.svg";
import { EditMenu } from "../../components/EditMenu";
import { stopPropagation } from "../../utils/hooks/usePropagination";
import Button from "../../components/Button";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice";

export const Profile = ({ setIsLogged, setCurrentUser }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [avatarValid, setAvatarValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const dispatch = useDispatch();
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  const TEMP_DATA_FOR_POPUP = [
    {
      label: "Logout",
      color: "#EA5555",
      action: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    dispatch(closeModal());
    setIsLogged(false);
  };

  const clickOnEditMenu = (e) => {
    stopPropagation(e);
    setShowEdit((prev) => !prev);
  };

  const clickOnModal = () => {
    setShowEdit(false);
  };
  const cancelEdit = () => {
    setIsDisabled(true);
  };
  const setDisabledStatus = (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  function handleNameChange(e) {
    let nameInputValue = /^[a-zA-Zа-яА-Я-]{2,30}/.test(e.target.value);
    setNameValid(nameInputValue);
    if (!nameInputValue) {
      setNameError("Некорректно введено имя");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    let emailInputValue = /\S+@\S+\.\S+/.test(e.target.value);
    setEmailValid(emailInputValue);
    if (!emailInputValue) {
      setEmailError("Incorrectly entered Email");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    let avatarInputValue = /(https?:\/\/.*\.(?:png|jpg))/i.test(e.target.value);
    setAvatarValid(avatarInputValue);
    if (!avatarInputValue) {
      setAvatarError("Incorrectly format of image. Tyr png or jpg");
    } else {
      setAvatarError("");
    }
    setAvatar(e.target.value);
  };

  const handleSaveProfile = () => {
    alert("В тестировании функция недоступна");
  };

  return (
    <div className="profile" onClick={clickOnModal}>
      <div className="profile__wrapper">
        <h3 className="profile__title">Hello, {currentUser.name}</h3>
        <div className="action-menu">
          <img
            className="action-menu__dots"
            onClick={clickOnEditMenu}
            src={Dots}
            alt="action-menu"
          />
          <EditMenu
            options={TEMP_DATA_FOR_POPUP}
            width="200px"
            show={showEdit}
            setShowEdit={setShowEdit}
          />
        </div>
      </div>
      <form className="profile__form">
        <img className="profile__avatar" src={currentUser.avatar} />
        <div className="profile__input-area">
          <p className="profile__subtext">Avatar (url)</p>
          <input
            className="profile__input"
            id="avatar"
            name="avatar"
            type="url"
            required
            placeholder="png or jpg"
            autoComplete="off"
            disabled={isDisabled}
            onChange={handleAvatarChange}
          />
        </div>
        <span className="profile__input-error">{avatarError}</span>
        <div className="profile__input-area">
          <p className="profile__subtext">Name</p>
          <input
            className="profile__input"
            id="name"
            name="name"
            type="text"
            required
            autoComplete="off"
            disabled={isDisabled}
            value={name || ""}
            onChange={handleNameChange}
          />
        </div>
        <span className="profile__input-error">{nameError}</span>
        <div className="profile__input-area">
          <p className="profile__subtext">Email</p>
          <input
            className="profile__input"
            id="email"
            name="email"
            type="text"
            required
            autoComplete="off"
            disabled={isDisabled}
            value={email || ""}
            onChange={handleEmailChange}
          />
        </div>
        <span className="profile__input-error">{emailError}</span>
        {/* <div className="profile__input-area">
                    <p className='profile__subtext'>Current Password</p>
                    <input className="profile__input" name="password" type='password' required />
                </div>
                <div className="profile__input-area">
                    <p className='profile__subtext'>New Password</p>
                    <input className="profile__input" name="password" type='password' required />
                </div>
                <div className="profile__input-area">
                    <p className='profile__subtext'>New Password</p>
                    <input className="profile__input" name="password" type='password' required />
                </div> */}
        <div className="profile__buttons">
          {!isDisabled ? (
            <>
              <Button
                label="Save profile"
                disabled={
                  nameValid === false ||
                  emailValid === false ||
                  avatarValid === false
                }
                isFullWidth
                isSmall
                fn={handleSaveProfile}
              />
              <Button
                label="Cancel"
                isFullWidth
                isSmall
                isDestructive
                fn={cancelEdit}
              />
            </>
          ) : (
            <Button
              label="Edit profile"
              isFullWidth
              isLarge
              fn={setDisabledStatus}
            />
          )}
        </div>
      </form>
    </div>
  );
};
