import NavbarPage from "../Componentes/NavBar.js"
import React, { useState, useEffect } from 'react';

function PaginaInicial() {
    const idEntidad = '657b62e984ccb34341cb0c18'

    const [entidad, setEntidad] = useState([]); 
    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${idEntidad}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setEntidad(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }
    
    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        console.log(result.imageUrl)
                        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${idEntidad}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            window.location.href = `/entidades/`;
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            alert("Selecciona una foto");   
            console.error('No se seleccionó ningún archivo.');
        }
        
    }

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h2> Esta es nuestra pagina inicial</h2>
                        <div className='container-fluid'>
                            <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                                <div style={{flexdirection: 'row', width:'90%'}} >
                                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                                    <img src={entidad.foto} alt="" style={{width:'39%'}} className="card-img-top img-fluid" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PaginaInicial