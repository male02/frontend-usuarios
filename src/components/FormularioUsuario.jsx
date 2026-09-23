import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client/react';

import {
  CREAR_USUARIO,
  ACTUALIZAR_USUARIO,
  OBTENER_USUARIOS
} from '../graphql/operaciones';

const inicial = {
  name: '',
  email: ''
};

export default function FormularioUsuario({
  usuarioEditar,
  alTerminar
}) {
  const [formulario, setFormulario] = useState(inicial);

  const opciones = {
    refetchQueries: [
      {
        query: OBTENER_USUARIOS
      }
    ]
  };

  const [crear] = useMutation(CREAR_USUARIO, opciones);
  const [actualizar] = useMutation(ACTUALIZAR_USUARIO, opciones);

  useEffect(() => {
    setFormulario(
      usuarioEditar
        ? {
            name: usuarioEditar.name,
            email: usuarioEditar.email
          }
        : inicial
    );
  }, [usuarioEditar]);

  const cambiar = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (usuarioEditar) {
      await actualizar({
        variables: {
          id: String(usuarioEditar.id),
          input: formulario
        }
      });
    } else {
      await crear({
        variables: {
          input: formulario
        }
      });
    }

    setFormulario(inicial);
    alTerminar();
  };

  return (
    <form onSubmit={guardar}>
      <h2>
        {usuarioEditar ? 'Editar usuario' : 'Nuevo usuario'}
      </h2>

      <input
        name="name"
        placeholder="Nombre"
        value={formulario.name}
        onChange={cambiar}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Correo"
        value={formulario.email}
        onChange={cambiar}
        required
      />

      <button type="submit">
        {usuarioEditar ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
}