import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {
    const [success, setSuccess] = useState();
    // onBlur rset
    const [userEmail, setUserEmail] = useState('');

    const handleOnSubmit = event => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //https://firebase.google.com/docs/auth/web/password-auth?hl=en&authuser=3
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setSuccess(true);
            })
            .catch(error => {
                console.error('error', error)
            })
    }
    // reset
    const hnadleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    // forgate password
    const handleForgatePassword = () => {
        if (!userEmail) {
            alert('Please enter your email address.')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password reset eamail sent. Plaease check your email.');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Login!!</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email Address</label>
                    <input onBlur={hnadleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="your email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="your password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {success && <p>Sucessfully login to the account.</p>}
            <p><small>New to this website? Please <Link to='/register'>Register</Link> </small></p>
            <p>Forgate Password? <small><button onClick={handleForgatePassword} type="button" className="btn btn-link">Reset password</button></small></p>
        </div>
    );
};

export default LoginBootstrap;