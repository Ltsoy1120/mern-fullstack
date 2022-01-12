import React, { useState } from "react";

export const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                  className="yellow-input"
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Войти
            </button>
            <button className="btn grey lighten-1 black-text">
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
