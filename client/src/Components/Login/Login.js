import React, { Fragment } from "react";

const Login = () => {
  return (
    <Fragment>
      <h1>Skate Park</h1>

      <div class="py-5">
        <h2>Iniciar Sesión</h2>
        <hr class="w-50" />

        <form>
          <div class="form-group">
            <div class="form-group">
              <label>Email</label>
              <input class="form-control w-50 m-auto" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input class="form-control w-50 m-auto" />
            </div>
          </div>
          <button class="btn btn-success mb-3">Ingresar</button>
          <p>
            ¿Aún no tienes cuenta? <a href="registro">Regístrate</a>
          </p>
        </form>
      </div>
    </Fragment>
  );
};
export default Login;
