import React, { Fragment } from "react";

const Admin = () => {
  return (
    <Fragment>
      <h1>Skate Park</h1>

      <div class="py-4">
        <h2>Administración</h2>
        <hr class="w-50" />

        <table class="table w-50 m-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Foto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Años de experiencia</th>
              <th scope="col">Especialidad</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <div></div>
              </td>
              <td>Tony Hawk</td>
              <td>12</td>
              <td>Kickflip</td>
              <td>
                <input type="checkbox" checked />
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <div></div>
              </td>
              <td>Evelien Bouilliart</td>
              <td>10</td>
              <td>Heelflip</td>
              <td>
                <input type="checkbox" checked />
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>
                <div></div>
              </td>
              <td>Danny Way</td>
              <td>8</td>
              <td>Ollie</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default Admin;
