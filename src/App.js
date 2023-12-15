import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import PaginaPrincipal from './Pages/paginaPrincipal.jsx';
import PaginaCrear from './Pages/paginaCrear.jsx';
import PaginaInicial from "./Pages/paginaInicial.jsx"
import PaginaMostrarEntidad from "./Pages/paginaMostrarEntidad.jsx"
import CompLogin from './Componentes/Login.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/principal/" element={<PaginaPrincipal/>}/>
        <Route path="/" element={<CompLogin/>}/>
        <Route path="/inicial/" element={<PaginaInicial/>}/>
        <Route path="/entidades/" element={<PaginaMostrarEntidad/>}/>
        <Route path='/create/' element={<PaginaCrear/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


