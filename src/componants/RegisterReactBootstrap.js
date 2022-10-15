import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';


//01. start firebase setup
const auth = getAuth(app)

const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegisterOnSubmit = event => {
        //01. use it no reload on submit
        event.preventDefault();
        setSuccess(false); // when error then its don not show UI

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // valid password strength in JS
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least two uppercase');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Please should be at least 6 charcters.');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError('Please add at least one special chartcer');
            return;
            // /[*$@#&!]+/
        }
        setPasswordError(''); // no error call


        //01. start firebase setup
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                setSuccess(true);
                form.reset(); // clear from after successfully created
                verifyEmail();
            })
            .catch(error => {
                console.error('error: ', error);
                setPasswordError(error.message);
            })
    }

    /// verification
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify your email address.')
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Register!!</h2>
            <Form onSubmit={handleRegisterOnSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>User created successfully.</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link> </small></p>
        </div>
    );
};

export default RegisterReactBootstrap;