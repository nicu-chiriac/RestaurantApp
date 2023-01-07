import React, { useState } from 'react';
import { onRegistration } from "./../apis/AuthFinder";
import { BsPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import './auth.css';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)
      setError('')
      setSuccess(data.msg)
      console.log(data.msg)
      setValues({ username: '', email: '', password: '' })
    } catch (error) {
      console.log(error.response.data.msg)
      setError(error.response.data.msg)
      setSuccess('')
    }
  }

  return (
    <div className='auth_container'>
      <form onSubmit={(e) => onSubmit(e)} className='form__container'>
        <h1>Register</h1>

        <div className='mini__container'>
          <label className='form-label'>
            Username
          </label>
          <div className='input-wrapper'>
            <BsPersonFill size='1.5em' className='icon' />
            <input
              onChange={(e) => onChange(e)}
              type='text'
              className='form-control'
              id='username'
              name='username'
              value={values.username}
              placeholder='Popescu Ion'
              required
            />
          </div>
        </div>

        <div className='mini__container'>
          <label htmlFor='email' className='form-label'>
            Email adress
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
            Password
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
        <div className='auth__message' style={{ color: 'green', margin: '10px 0' }}>{success}</div>
        <div>
          <button type='submit' className='submitButton'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register