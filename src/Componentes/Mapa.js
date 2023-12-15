//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import NavbarPage from './NavBar.js';

const CompMapa = () => {
    const [position, setPosition] = useState([0, 0])
    const [eventos, setEventos] = useState([])
    const [mostrarEventos, setMostrarEventos] = useState(false)
    const [ubicacionCargada, setUbicacionCargada] = useState(false);

   

    const buscarCercanos = (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario
        var raw = JSON.stringify({
            "lugar": position,
        })
        //fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/paradas/linea/', {
        fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/evento/cercano/', {
        //fetch('http://localhost:4000/eventos/evento/cercano/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setEventos(data)
            setMostrarEventos(true)
            console.log(data);
        })
    }

    
    //-------------------------------------------------------------------------------------------------//

    const limpiar = () => {
        
        setMostrarEventos(false)
        setEventos([])
        mostrarMapa()
    }

    const mostrarMapa = () => {
        //fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/paradas/ubicacion/', {
            fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/ubicacion/getUbi/')
            //fetch('http://localhost:4000/eventos/ubicacion/getUbi/')
            .then(response => response.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    setPosition([data.latitude, data.longitude]);
                }
            })
            .catch(error => {
                console.error('Error al obtener producto:', error);
            });
    }

    useEffect(() => {
        mostrarMapa()
    }, [])  // Con el [] hago que solo se haga un useEffect

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col 2">
                        <h2>
                            Vista Principal <br></br>
                            {/*Bienvenido userEmail*/}
                        </h2>
                        <div className='formulario'>
                            <h2>Ingresa una direccion</h2>
                            <form className='form' onSubmit={buscarCercanos}>
                                <a>Linea</a>
                                <input value={position} onChange={(e) => setPosition(e.target.value)}
                                    className='form-control' required type='text' />
                                <br/>

                                <button className='btn btn-primary' type='submit'>Buscar</button>
                            </form>
                            <form className='form mt-2' onSubmit={limpiar}>
                                <button className='btn btn-secondary'>Limpiar</button>
                            </form>
                        </div>
                    </div>
                    <div className='col 9'>
                        {position[0] !== 0 && position[1] !== 0 && (
                        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                                OpenStreetMap</a> contributors'
                            />
                            
                            {eventos && eventos.map((parada, index) => (
                                    <Marker
                                        key={index}
                                        position={[parada.lat, parada.lon]}
                                    >
                                        <Popup>{`Parada ${parada.nombreParada}`}</Popup>
                                    </Marker>
                                ))}
                        </MapContainer>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompMapa