import { useState, useContext } from 'react';
import { onLogin } from "./../apis/AuthFinder";
import './auth.css';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { security } from './../apis/AuthFinder';
import UserContext from '../Context/UserContext';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const [user, setUser] = useContext(UserContext);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const p1 = await onLogin(values)
      const p2 = await security()
      setUser({
        isLoggedIn: true,
        role: p2.data.logged_in_as
      });
      console.log(p2.data.logged_in_as)
      navigate('/#home');
    } catch (error) {
      console.log(error.response.data.msg)
      setError(error.response.data.msg)
    }
  }

  return (
    <div className='auth_container'>
      <form onSubmit={(e) => onSubmit(e)} className='form__container'>
        <h1>Login</h1>
        <div className='mini__container'>
          <label htmlFor='email' className='form-label'>
            Adresă de email
          </label>
          <div className='input-wrapper'>
            <MdEmail size='1.5em' className='icon' />
            <input
              onChange={(e) => onChange(e)}
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={values.email}
              placeholder='test@gmail.com'
              required
            />
          </div>
        </div>
        <div className='mini__container'>
          <label htmlFor='password' className='form-label'>
            Parolă
          </label>
          <div className='input-wrapper'>
            <RiShieldKeyholeFill size='1.5em' className='icon' />
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              className='form-control'
              id='password'
              name='password'
              placeholder='parolă'
              required
            />
          </div>
        </div>
        <div className='auth__message' style={{ color: 'red', margin: '10px 0' }}>{error}</div>
        <div className='centerize'>
          <button type='submit' className='submitButton'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login