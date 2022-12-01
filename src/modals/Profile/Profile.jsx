import './Profile.scss'
import {useState, useContext, useEffect} from 'react';
import Dots from '../../images/dots.svg';
import { EditMenu } from '../../components/EditMenu';
import { stopPropagation } from '../../utils/hooks/usePropagination';
import Button from '../../components/Button';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice';

export const Profile = ({setIsLogged}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true)
    const [nameError, setNameError] = useState("");
    const [nameValid, setNameValid] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const currentUser = useContext(CurrentUserContext);

    const dispatch = useDispatch();
    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email)
      }, [currentUser]);

    const TEMP_DATA_FOR_POPUP = [
        {
            label: 'Logout',
            color: '#EA5555',
            action: () => handleLogout()
        }
    ];

    const handleLogout = () => {
        dispatch(closeModal());
        setIsLogged(false)

    }

    const clickOnEditMenu = e => {
        stopPropagation(e);
        setShowEdit(prev => !prev);
    };

    const clickOnModal = () => {
        setShowEdit(false);
    };
    const cancelEdit = () => {
        setIsDisabled(true)
    }
    const setDisabledStatus = (e) => {
        e.preventDefault();
        setIsDisabled(false)
    }

    function handleNameChange(e) {
        let nameInputValue = /^[a-zA-Zа-яА-Я-]{2,30}/.test(
          e.target.value)
        setNameValid(nameInputValue)
        if (!nameInputValue) {
          setNameError("Некорректно введено имя")
        } else {
          setNameError("")
        }
        setName(e.target.value);
      }

    return (
        <div className='profile' onClick={clickOnModal}>
            <div className='profile__wrapper'>
                <h3 className='profile__title'>Hello, {currentUser.name}</h3>
                <div className='action-menu'>
                    <img className='action-menu__dots' onClick={clickOnEditMenu} src={Dots} alt='action-menu' />
                    <EditMenu options={TEMP_DATA_FOR_POPUP} width='200px' show={showEdit} setShowEdit={setShowEdit} />
                </div>

            </div>
            <form className="profile__form" >
                <div className="profile__input-area">
                    <p className='profile__subtext'>Name</p>
                    <input className="profile__input" id="name" name="name" type="text" required autoComplete="off" disabled={isDisabled} value={name || ''} 
                    onChange={handleNameChange}
                    />
                </div>
                <div className="profile__input-area">
                    <p className='profile__subtext'>Email</p>
                    <input className="profile__input" id="name" name="name" type="text" required autoComplete="off" disabled={isDisabled} value={email || ''} 
                    onChange={handleNameChange}
                    />
                </div>
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
                <div className='profile__buttons'>
                    {!isDisabled ? <><Button label='Save profile' isFullWidth isSmall />
                        <Button label='Cancel' isFullWidth isSmall isDestructive fn={cancelEdit} /></> :
                        <Button label='Edit profile' isFullWidth isLarge fn={setDisabledStatus} />}
                </div>
            </form>
        </div>
    )
}