import { useState } from 'react';
import FormularioUsuario from './components/FormularioUsuario';
import ListaUsuarios from './components/ListaUsuarios';
import './App.css';

export default function App() {
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  return (
    <main className="contenedor">
      
      <div className="encabezado">
        <div className="icono-titulo">👥</div>

        <div>
          <h1>Gestión de Usuarios</h1>
          <p>Administra, registra, edita y elimina usuarios del sistema</p>
        </div>
      </div>

      <section className="tarjeta">
        <FormularioUsuario
          usuarioEditar={usuarioEditar}
          alTerminar={() => setUsuarioEditar(null)}
        />
      </section>

      <section className="seccion-tabla">
        <div className="titulo-tabla">
          <h2>Usuarios registrados</h2>
          <span>Información almacenada en MySQL</span>
        </div>

        <ListaUsuarios
          alEditar={setUsuarioEditar}
        />
      </section>

    </main>
  );
}