import React, { useState } from 'react';
import SignUpScreen from '../SignUpScreen';
import './LoginPage.css';

function LoginPage() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="loginPage">
            <div className="loginPage__background">
                <img
                    className="loginPage__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix logo"
                />
                <button
                    className="loginPage__button"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>
                <div className="loginPage__gradient"></div>
            </div>
            <div className="loginPage__body">
                {signIn ? (
                    <SignUpScreen />
                ) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel anytime</h2>
                        <h3>
                            Ready to watch?. Enter your email to create or
                            restart your membership.
                        </h3>
                        <div className="loginPage__input">
                            <form>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                                <button
                                    onClick={() => setSignIn(true)}
                                    className="loginPage__getStarted"
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
