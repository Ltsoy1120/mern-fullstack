import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage(); // кастомный хук
  const { loading, request, error, clearError } = useHttp(); // кастомный хук для серверных запросов
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error); //вывод ошибочного ответа в окно через хук useMessage
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields(); // для коректного отображения label в инпутах, чтобы сделать инпуты активными
  }, []);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message); //вывод положительного ответа в окно через хук useMessage
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (error) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  className="yellow-input"
                  onChange={changeHandler}
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Пароль</label>
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="yellow-input"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
