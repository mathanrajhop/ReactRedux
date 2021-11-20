import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {withRouter, Route, Redirect, Switch, useHistory} from 'react-router-dom';

import urlPath from '../constant/urlPath';

import '../css/Login.css';

function Login() {
  const history = useHistory();
  const username = 'admin@123.com'
  const password = '123456'

  const [formData, setFormData] = React.useState({});
  const [validate, setValidate] = React.useState({});
  const dispatch = useDispatch();

  const isLogin = useSelector( state => state.isActive)

  const isValidate = () => {
    let isValidateData = {}
    if (formData.email !== username) {
      isValidateData.email = 'Your Email is not Matched'
    }

    if (formData.password !== password) {
      isValidateData.password = 'Your Password is not Matched'
    }

    if (isValidateData.email || isValidateData.password) {

      setValidate({
        ...isValidateData
      })

      return false
    }

    return true
  }
  const onSave = async (e) => {
    e.preventDefault();

    const finalValidate = await isValidate()

    if (!finalValidate) {
      alert('Your credentials has not been matched')
      return
    }

    const result = await dispatch({
        ...formData,
        type: 'LOGIN',
        isActive: true,
      })
      if (result.isActive) {
        history.push(urlPath.dashboard);
      }

    }

  return (
    <>
      <div className="login">
        <div className="form">
          <form className="login-form" onSubmit={onSave}>
            <h3 className="material-icons">Login</h3>
            <input
              type="text"
              className={`input-test ${validate && validate.email ? `error` : null}`}
              placeholder={`${validate && validate.password ? validate.email : `Email`}`}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />

            <input
              type="password"
              className={`input-test ${validate && validate.password ? `error` : null}`}
              placeholder={`${validate && validate.password ? validate.password : `Password`}`}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
            <label className="remember" for="checkbox">
            <input type="checkbox" id="checkbox" />Remember me </label>
            <p className="forgot-password">Forgot password </p>
            <button>login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
