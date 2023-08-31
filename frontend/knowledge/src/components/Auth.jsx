import React from 'react'
import './Auth.css';
import { useDispatch } from 'react-redux';
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('Learner');
  const [isSignUp, setIsSignUp] = useState(false);
  const [input, setInput] = useState({
    name: "", email: "", password: ""
  })

  function handleChange(ev) {
    setInput((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  function handleRoleChange(ev) {
    setSelectedRole(ev.target.value);
  }

  async function sendRequest(type = "login") {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
        role: selectedRole,
      });
      const data = res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(input);
    if (isSignUp) {
      sendRequest("signup")
        .then(data => {
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("role", data.user.role);
          return data; 
        })
        .then(data => {
          disPatch(authActions.login());
          return data; 
        })
        .then(data => {
          navigate("/");
          return data;
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      sendRequest()
        .then((data) => {
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem("role", data.user.role);
        })
        .then(() => disPatch(authActions.login()))
        .then(() => navigate('/'))
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error); // Handle errors if any step fails
        });
    }
  }


  return (
    <div className="auth-outline">
      <div className="auth-container">
        <h1>{isSignUp ? "SignUp" : "Login"}</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {isSignUp && <div className="form-subcontainer">
              <h4>Name:</h4>
              <input type="text" placeholder='Enter your Name' name='name' value={input.name} onChange={handleChange} />
            </div>}
            {isSignUp && <div className="role-container">
              <label>
                <input
                  className='radio'
                  type="radio"
                  value="Creator"
                  name="role"
                  checked={selectedRole === 'Creator'}
                  onChange={handleRoleChange}
                />
                Creator
              </label>
              <label>
                <input
                className='radio'
                  type="radio"
                  value="Learner"
                  name="role"
                  checked={selectedRole === 'Learner'}
                  onChange={handleRoleChange}
                />
                Learner
              </label>
            </div>}
            <div className="form-subcontainer">
              <h4>E-mail:</h4>
              <input type="text" placeholder='Enter your E-Mail' name='email' value={input.email} onChange={handleChange} />
            </div>
            <div className="form-subcontainer">
              <h4>Password:</h4>
              <input type="password" placeholder='Enter your Password' name='password' value={input.password} onChange={handleChange} />
            </div>
            <input className='submit-button' type="submit" />
            <div className="Auth" onClick={() => setIsSignUp(!isSignUp)} >{isSignUp ? "Login?" : "SignUp?"}</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth