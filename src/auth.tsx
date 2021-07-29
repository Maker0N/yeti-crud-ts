import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isLogin } from './redux/authReducer'
import store from './redux/store'

interface AuthProps {
  isLogin: boolean
}

const Auth: FC<AuthProps> = (props) => {
  const dispatch = useDispatch()
  const [logPass, setLogPass] = useState({
    login: "",
    pass: "",
  });
  const [effect, setEffect] = useState(
    "flex justify-center items-center w-screen h-screen bg-green-700"
  );

  const onChangeHandler = (e): void => {
    const { name, value } = e.target
    setLogPass(() => ({...logPass, [name]: value}))
  }

  const clearValue = (): void => {
    setLogPass(() => ({...logPass, login: '', pass: ''}))
  }

  return (
    <div
      className={effect}
    >
      <form>
        <label htmlFor="" className="flex justify-center mb-3">
          Авторизация!
        </label>
        <input
          type="text"
          className="block mb-3 px-1 outline-none"
          name="login"
          value={logPass.login}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          className="block mb-3 px-1 outline-none"
          name="pass"
          value={logPass.pass}
          onChange={onChangeHandler}
        />
        <Link to='/main' className="flex justify-center">
          <input
            type="submit"
            className="px-1"
            value="Войти!"
            onClick={(e) => {
              axios
                .put("http://localhost:5000/login", logPass)
                .then((res) => dispatch(isLogin(res.data)))
                .catch((err) => console.log(err));
              clearValue();
              setEffect(
                "flex justify-center items-center w-screen h-screen bg-green-700 transition transform -translate-y-full"
              )
              setTimeout(() => {
              localStorage.setItem('auth', JSON.stringify(store.getState().authReducer))
              }, 2000)
              setTimeout(() => {
                localStorage.setItem('auth', JSON.stringify({ isLogin: false }))
                dispatch(isLogin(false))
              }, 300000)
            }}
          />
        </Link>
      </form>
    </div>
  );
}

export default Auth