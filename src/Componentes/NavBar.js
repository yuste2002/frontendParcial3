import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import logo from '../logo.svg'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function NavbarPage(props) {
  const [nombreUsuario,setNombreUsuario]=useState('')
  const [foto,setFoto]=useState('')

  useEffect(() => {
    if(localStorage.getItem('objetoToken')!=undefined){
      comprobarConexion() ///AJUSTAR A ESTE PROYECTO
      setNombreUsuario(JSON.parse(localStorage.getItem('objetoToken')).correo)
      setFoto(JSON.parse(localStorage.getItem('objetoToken')).foto)
    } 
}, []);

const comprobarConexion = async () => {
  //fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/conexion/${JSON.parse(localStorage.getItem('objetoToken')).tokenId}/${JSON.parse(localStorage.getItem('objetoToken')).tokenCompleto}`, {
    fetch(`http://localhost:4000/entidades/conexion/${JSON.parse(localStorage.getItem('objetoToken')).tokenId}/${JSON.parse(localStorage.getItem('objetoToken')).tokenCompleto}`, {  
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.text())
      .then(data => {
            console.log(data)
            if(data=="expired" || data=="invalid token"){
              localStorage.clear()
              alert("Tu sesion ha expirado")
              window.location.href = '/login'
            }
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function cerrarSesion () {
  console.log("en Cerrar sesion")
  localStorage.clear();
      // Redirige a /login
  window.location.href = '/login';
}
    return (
      <Navbar expand="lg" className="navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
        <Nav className="me-auto">
          <Nav.Link href={`/inicial/`} className='navbar-link' style={{marginLeft: '10vmin'}}> Foto
          </Nav.Link>
          <Nav.Link href={`/principal/`} className='navbar-link' style={{marginLeft: '10vmin'}}> Mapa
          </Nav.Link>
          <Nav.Link href={`/entidades/`} className='navbar-link' style={{marginLeft: '10vmin'}}> Entidad
          </Nav.Link> 
          <Nav.Link href={`/create/`} className='navbar-link' style={{marginLeft: '10vmin'}}> Crear
          </Nav.Link> 
        </Nav>
        <NavItem>{(nombreUsuario!='')? (nombreUsuario) : "Hola" }</NavItem>
        <Nav>
            <NavDropdown drop='start' className='me-3' title={<img src={foto} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
            <NavDropdown.Item href={`/myUserInfo/`}>Ver mi perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={cerrarSesion}>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  }

  export default NavbarPage;