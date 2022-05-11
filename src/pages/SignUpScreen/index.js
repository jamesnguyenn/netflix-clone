import React, { useRef } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import './SignUpScreen.css';
import { auth } from '../../firebaseConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schemaValidations = Yup.object({
    email: Yup.string()
        .email('Email is not valid type')
        .required('Email  is required !'),
    password: Yup.string()
        .required('Password is require !')
        .matches(/(?=.{8,})/, 'Password must be at least 8 characters !')
        .matches(/[A-Z]/, 'Password must have at least 1 uppercase character !')
        .matches(
            /(?=.*[0-9])/,
            'Password must have at least 1 number character !'
        )
        .matches(
            /(?=.*[!@#\$%\^&\*])/,
            'Password must have at least 1 special character !'
        ),
});

function SignUpScreen() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
    });

    const emailRef = watch('email');
    const passwordRef = watch('password');

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                emailRef,
                passwordRef
            );
        } catch (error) {
            alert(error.message);
        }
    };

    const signIn = async (value) => {
        console.log('🚀 ~ value', value);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                value.email,
                value.password
            );
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="signupScreen">
            <form onSubmit={handleSubmit(signIn)}>
                <h1>Sign In</h1>
                <span style={{ textAlign: 'left' }}>
                    email: admin@gmail.com
                </span>
                <input
                    // ref={emailRef}
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors?.email && (
                    <div className="signupScreen__error">
                        {errors?.email?.message}
                    </div>
                )}
                <span style={{ textAlign: 'left' }}>password: Abcabc@1</span>
                <input
                    // ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors?.password && (
                    <div className="signupScreen__error">
                        {errors?.password?.message}
                    </div>
                )}
                <button type="submit">Sign In</button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix?</span>
                    <span className="signupScreen__link" onClick={signUp}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default SignUpScreen;
