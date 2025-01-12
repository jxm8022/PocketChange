import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { labels } from "../../../resources/labels";
import { setMessage } from "../../../actions/pageActions";
import { changePassword } from "../../../api/userAPI";
import { login } from "../../../actions/userActions";
import showHidePassword from '../../../assets/images/auth/icons8-eye-90.png';
import './UpdatePassword.css';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const passwordInputRef = useRef();
    const { token } = useSelector((state) => state.user);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredPassword = passwordInputRef.current.value;

        if (token) {
            changePassword(token, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    dispatch(setMessage('Password successfully changed'));
                }
            });
        }

        passwordInputRef.current.value = '';
    };

    const showPassword = () => {
        var type = document.getElementById('password');
        if (type.getAttribute('type') === 'password') {
            type.setAttribute('type', 'text');
        } else {
            type.setAttribute('type', 'password');
        }
    };

    return (
        <form className='updatePassword' onSubmit={submitHandler}>
            <div className='passwordForm'>
                <label htmlFor='password'>{labels.changePassword}</label>
                <div className='passwordInput'>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                    />
                    <img onClick={showPassword} src={showHidePassword} alt='Hide or show password' className='showBtn' />
                </div>
            </div>
            <div>
                <button>{labels.submit}</button>
            </div>
        </form>
    );
}

export default UpdatePassword;