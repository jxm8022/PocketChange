import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../actions/pageActions';
import { login } from '../../actions/userActions';
import { signIn, resetPassword } from '../../api/userAPI';
import { labels } from '../../resources/labels';

import showHidePassword from '../../assets/images/auth/icons8-eye-90.png';
import styled from "styled-components";
import Loader from '../UI/Loader/Loader';

const AuthForm = () => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            signIn(!isLogin, enteredEmail, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    navigate({
                        pathname: '/yearOverview',
                    });
                }
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            signIn(!isLogin, enteredEmail, enteredPassword).then((res) => {
                if (res) {
                    dispatch(login(res));
                    navigate({
                        pathname: '/yearOverview',
                    });
                }
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    const sendEmail = () => {
        setIsLoading(true);
        const enteredEmail = emailInputRef.current.value;

        if (enteredEmail.length > 0) {
            setIsEmailValid(true);
            resetPassword(enteredEmail).then((res) => {
                if (res) {
                    dispatch(setMessage(`Instructions sent to ${res.email}`));
                }
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsEmailValid(false);
        }
    }

    const showPassword = () => {
        var type = document.getElementById('password');
        if (type.getAttribute('type') === 'password') {
            type.setAttribute('type', 'text');
        } else {
            type.setAttribute('type', 'password');
        }
    };

    return (
        <AuthWrapper>
            <Loader isLoading={isLoading} />
            <h2>{isLogin ? labels.login : labels.signUp}</h2>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='email'>{labels.email}</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                    {!isEmailValid ? <p className='error'>{labels.enterEmail}</p> : <></>}
                </div>
                <div className='control'>
                    <label htmlFor='password'>{labels.password}</label>
                    <div className='passwordContainer'>
                        <input
                            type='password'
                            id='password'
                            required
                            ref={passwordInputRef}
                        />
                        <img onClick={showPassword} src={showHidePassword} alt='Hide or show password' className='showPassword' />
                    </div>
                </div>
                <div className='actions'>
                    <button>{isLogin ? labels.login : labels.createAccount}</button>
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? labels.signUp : labels.login}
                    </button>
                </div>
            </form>
            <button onClick={sendEmail} className='forgotPassword'>{labels.forgotPassword}</button>
        </AuthWrapper>
    );
};

export default AuthForm;

const AuthWrapper = styled.div`
    /* mobile */
    width: 75%;
    border-radius: 80px;
    padding: 25px;

    h2 {
        text-align: center;
    }

    .control {
        margin-bottom: 30px;
    }

    .control label {
        display: block;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .control input {
        font: inherit;
        border-radius: 50px;
        width: 97%;
        text-align: left;
        padding: .5rem;
    }

    .actions {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .actions button,
    .toggle,
    .forgotPassword {
        cursor: pointer;
        font: inherit;
        font-weight: 600;
        color: var(--pink);
        border: none;
        padding: 0.5rem 2.5rem;
    }

    .actions button,
    .toggle {
        background-color: var(--darkteal);
        border-radius: 50px;
    }

    .forgotPassword {
        background-color: transparent;
    }

    .actions .toggle {
        margin: 15px 0 0 0;
    }

    .forgotPassword {
        display: block;
        font-size: 1rem;
        margin: 15px auto 5px auto;
    }

    .passwordContainer {
        position: relative;
    }

    .showPassword {
        position: absolute;
        top: 25%;
        right: 10px;
        height: 50%;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {
        width: 30%;
    }

    @media (prefers-color-scheme: dark) {
        background-color: var(--pink);

        h2 {
            color: var(--teal);
        }

        .control label {
            color: var(--teal);
        }
        
        .control input {
            border: 1px solid var(--teal);
        }

        .forgotPassword {
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        background-color: var(--teal);

        h2 {
            color: var(--pink);
        }

        .control label {
            color: var(--pink);
        }
        
        .control input {
            border: 1px solid var(--pink);
        }

        .forgotPassword {
            color: var(--pink);
        }
    }
`;