import React, { useState, useEffect } from 'react';
import { setElement } from 'react-modal/lib/helpers/ariaAppHider';

const CompEntidad = () => {

    const [usuario, setUsuario] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [idEntidad, setIdEntidad] = useState()
    const [imageURL, setImageURL] = useState('')


    const crearEntidad = async (e) => {
        e.preventDefault();

        const input = document.getElementById('archivo');
        const archivo = input.files[0];

        var raw = JSON.stringify({
            "usuario": usuario,
            "ubicacion": ubicacion,
        });

        try {
            const response = await fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: raw
            });

            const result = await response.text();
            console.log(result);
            setIdEntidad(result);
            console.log("A")
            var formdata = new FormData();
            formdata.append("foto", archivo);

            const uploadResponse = await fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/subirFoto', {
                method: 'POST',
                body: formdata
            });

            const uploadResult = await uploadResponse.json();
            setImageURL(uploadResult.imageURL);
            console.log(uploadResult);

            // Elimina las comillas dobles del resultado antes de usarlo en la URL del tercer fetch
            const entityIdWithoutQuotes = result.replace(/"/g, '');


            var raw = JSON.stringify({
                "foto": uploadResult.imageURL
            })

            const entidadEditada = await fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${entityIdWithoutQuotes}`, {
                method: 'PUT',
                body: raw
            });

            console.log("Entidad editada: " + entidadEditada)

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return(
        <div className="container">
            <div className="formularioCrear">
                <form className="form" onSubmit={crearEntidad} >
                    <a>Usuario:</a><br/>
                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} 
                    type="text" id="usuario" className="form-control" required/>
                    <br/>

                    <a>Ubicacion:</a><br/>
                    <textarea value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                    id="ubicacion" className="form-control" required></textarea>
                    <br/>

                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>

                    <button className="btn btn-primary mt-4" type="submit">Crear Entidad</button>
                </form>
            </div>
        </div>
    )
    
}

export default CompEntidad