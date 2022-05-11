import React, { useRef } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import './SignUpScreen.css';
import { auth } from '../../firebaseConfig';

function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            );
            console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit" onClick={signIn}>
                    Sign In
                </button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix?</span>
                    <span className="signupScreen__link" onClick={register}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default SignUpScreen;
