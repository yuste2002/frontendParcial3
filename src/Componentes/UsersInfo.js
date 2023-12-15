import React, { useState, useEffect } from 'react';

const CompUsersInfo = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        //fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/', {
        fetch('http://localhost:4000/entidades/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()) // Agregando paréntesis aquí
        .then(data => {
            setUsers(data)
            console.log(data)
        })
        .catch(error => {
            console.error('Error al obtener la lista de entidades:', error);
        });
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                {users &&
                        users.map((user, index) => (
                            <div key={index}>
                                <h2>Usuario: {user.usuario}</h2>
                                <p>Ubicacion: {user.ubicacion}</p>
                                <img src={user.foto} style={{width:'39%'}} alt={`Foto de ${user.usuario}`} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )

}

export default CompUsersInfo