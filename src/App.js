import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import PaginaCrear from './Pages/paginaCrear.jsx';
import PaginaInicial from "./Pages/paginaInicial.jsx"
import PaginaPrincipal from './Pages/paginaPrincipal.jsx';
import CompLogin from './Componentes/Login.js';
import PaginaEvento from './Pages/paginaEvento.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal/>}/>
        <Route path="/inicial/" element={<PaginaInicial/>}/>
        <Route path='/create/' element={<PaginaCrear/>}/>
        <Route path='/eventoInfo/:idEvento' element={<PaginaEvento/>}/>
        <Route path="login/" element={<CompLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


