import React, { useState, useEffect } from 'react';
import { setElement } from 'react-modal/lib/helpers/ariaAppHider';

const CompEntidad = () => {

    const [nombre, setNombre] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [organizador, setOrganizador] = useState(JSON.parse(localStorage.getItem('objetoToken')).correo)
    //const [imagen, setImagen] = useState()
    //const [idEntidad, setIdEntidad] = useState()
    var foto


    const crearEntidad = async (e) => {
        e.preventDefault();

        //const input = document.getElementById('archivo');
        //const archivo = input.files[0];

        var raw = JSON.stringify({
            "nombre": nombre,
            "lugar": ubicacion,
            "organizador": organizador,
        });

        try {
            //const response = await fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/', {
            const response = await fetch('http://localhost:4000/eventos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: raw
            });

            const result = await response.text();
            console.log(result);
            window.location.href = `/`;
            /*setIdEntidad(result);
            console.log("A")
            var formdata = new FormData();
            formdata.append("foto", archivo);

            //const uploadResponse = await fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/subirFoto', {
                const uploadResponse = await fetch('http://localhost:4000/entidades/subirFoto', {
                method: 'POST',
                body: formdata
            });

            const uploadResult = await uploadResponse.json();
            foto = uploadResult.imageURL;
            console.log(uploadResult);

            // Elimina las comillas dobles del resultado antes de usarlo en la URL del tercer fetch
            const entityIdWithoutQuotes = result.replace(/"/g, '');


            var raw = JSON.stringify({
                "foto": foto
            })

            //const entidadEditada = await fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${entityIdWithoutQuotes}`, {
            const entidadEditada = await fetch(`http://localhost:4000/entidades/${entityIdWithoutQuotes}`, {
                method: 'PUT',
                body: raw
            });

            console.log("Entidad editada: " + entidadEditada)
            */
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return(
        <div className="container">
            <div className="formularioCrear">
                <form className="form" onSubmit={crearEntidad} >
                    <a>Nombre del evento:</a><br/>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} 
                    type="text" id="usuario" className="form-control" required/>
                    <br/>

                    <a>Lugar donde se organizara:</a><br/>
                    <textarea value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                    id="ubicacion" className="form-control" required></textarea>
                    <br/>

                    <button className="btn btn-primary mt-4" type="submit">Crear Entidad</button>
                </form>
            </div>
        </div>
    )
    
}

export default CompEntidad