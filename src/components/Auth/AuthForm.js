import { useAuth } from './AuthContext';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { labels } from '../../resources/labels';
import { setMessage } from '../../actions/pageActions';
import { loginUser, signUpUser, resetPassword } from '../../api/authAPI';

import showHidePassword from '../../assets/images/auth/icons8-eye-90.png';
import styled from "styled-components";
import Loader from '../UI/Loader/Loader';

const AuthForm = () => {
    const { isLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/yearOverview");
        }
    }, [isLoggedIn, navigate]);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const loginAsync = async (event) => {
        event.preventDefault();

        if (!isEmailValid) {
            return;
        }

        setIsLoading(true);

        try {
            if (isLogin) {
                await loginUser(email, password);
            } else {
                await signUpUser(email, password);
            }
            navigate("/yearOverview");
        }
        catch (ex) {
            console.log(ex.message)
        }
        finally {
            setIsLoading(false);
        }
    };

    const sendEmail = async () => {
        if (!isEmailValid) {
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword(email);
            dispatch(setMessage(`Instructions sent to ${email}`));
        }
        catch (ex) {
            console.log(ex.message)
        }
        finally {
            setIsLoading(false);
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
            <form onSubmit={loginAsync}>
                <div className='control'>
                    <label htmlFor='email'>{labels.email}</label>
                    <input
                        type='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        onBlur={() => { setIsEmailValid(email.includes('@')) }}
                    />
                    {!isEmailValid ? <p className='error'>{labels.enterEmail}</p> : <></>}
                </div>
                <div className='control'>
                    <label htmlFor='password'>{labels.password}</label>
                    <div className='passwordContainer'>
                        <input
                            type='password'
                            id='password'
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
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