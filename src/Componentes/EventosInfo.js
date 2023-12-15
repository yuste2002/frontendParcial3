import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompEventosInfo = () => {
    const [eventos, setEventos] = useState([])
    const [organizador, setOrganizador] = useState('')

    useEffect(() => {
        if(localStorage.getItem('objetoToken')!=undefined) {
            setOrganizador(JSON.parse(localStorage.getItem('objetoToken')).correo)
        }
    }, [])

    useEffect(() => {
        //fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/', {
        fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/', {
        //fetch('http://localhost:4000/eventos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()) // Agregando paréntesis aquí
        .then(data => {
            setEventos(data)
            console.log(data)
        })
        .catch(error => {
            console.error('Error al obtener la lista de eventos:', error);
        });
    }, [])

    const borrar = async (eventoId) => {
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/${eventoId}`, {
        //fetch(`http://localhost:4000/eventos/${eventoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()) // Agregando paréntesis aquí
        .then(data => {
            console.log("Borrado")
            alert("Evento borrado")
            window.location.reload()
            
        })
        .catch(error => {
            console.error('Error al obtener la lista de eventos:', error);
        });
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                {eventos &&
                        eventos.map((evento, index) => (
                            <div key={index} className='card'>
                                <div className='card-body'>
                                    <h4 className='card-title'>Nombre del evento: {evento.nombre}</h4> <br></br>
                                    <h4 className='card-title'>Organizador: {evento.organizador}</h4>< br></br>
                                    <Link className='btn btn-primary' to={`/eventoInfo/${evento._id}` }>Ver detalles</Link>
                                    {evento.organizador == organizador && (
                                        <button onClick={() => borrar(evento._id)} className='btn btn-danger'>Borrar</button>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )

}

export default CompEventosInfo