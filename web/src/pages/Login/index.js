import React, { useState } from "react";

export function LoginPage({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const token = username + password;
    setToken({ token });
  }

  return (
    <div>
      {/* <h1>Iniciar sesión</h1> */}
      <div style={{ maxWidth: 300 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button primary">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
