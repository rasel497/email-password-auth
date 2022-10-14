import './App.css';
import { getAuth } from 'firebase/auth'
import app from './firebase/firebase.init';

const auth = getAuth(app)

//handleRegister
const handleRegister = (event) => {
  event.preventDefault();
  console.log(event)
}


function App() {
  return (
    <div className="App">
      <form onSubmit={handleRegister}>
        <input type="email" name='email' id='' placeholder='your email' />
        <br />
        <input type="passwod" name='password' id='' placeholder='your password' />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default App;
