import React from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import './SignUpScreen.css';
import { auth } from '../../firebaseConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

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
            await createUserWithEmailAndPassword(auth, emailRef, passwordRef);
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const signIn = async (value) => {
        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            toast.error(
                'Login not successfully !. Try again later or please contact customer services!',
                {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }
    };

    return (
        <div className="signupScreen">
            <form onSubmit={handleSubmit(signIn)}>
                <h1>Sign In</h1>
                <span style={{ textAlign: 'left' }}>
                    Email Test: admin@gmail.com
                </span>
                <span style={{ textAlign: 'left' }}>
                    Password Test: Abcabc@1
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
                    <span className="signupScreen__gray">
                        New member of Netflix?
                    </span>
                    <span className="signupScreen__link" onClick={signUp}>
                        Sign Up now.
                    </span>
                </h4>
            </form>
        </div>
    );
}

export default SignUpScreen;
