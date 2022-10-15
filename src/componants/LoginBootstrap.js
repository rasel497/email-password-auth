import React from 'react';
import { Link } from 'react-router-dom';

const LoginBootstrap = () => {

    const handleOnSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.password;
        const password = form.password;

        console.log(email, password);
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Login!!</h2>
            <form onSubmit={handleOnSubmit}>
                <div class="mb-3">
                    <label for="formGroupExampleInput" class="form-label">Email Address</label>
                    <input type="email" name='email' class="form-control" id="formGroupExampleInput" placeholder="your email" required />
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label">Password</label>
                    <input type="password" name='password' class="form-control" id="formGroupExampleInput2" placeholder="your password" required />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <p><small>New to this website? Please <Link to='/register'>Register</Link> </small></p>
        </div>
    );
};

export default LoginBootstrap;