import React, { useState, useEffect } from 'react';

const CompInicial = () => {

    const idEntidad = '657b62e984ccb34341cb0c18'

    const [entidad, setEntidad] = useState([]); 
    const [arrayFotos,setArrayFotos]= useState([]);
    const [foto, setFoto] = useState();

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

    //------------------------------------------------------------------------------------------------------------

    const subirFotos = async(e) => {
        e.preventDefault()
        const input2 = document.getElementById('archivos2');
        const archivos2 = input2.files;
        if(entidad.imagenes && entidad.imagenes.length > 0){
            for (let i = 0; i < entidad.imagenes.length; i++) {
                arrayFotos.push(entidad.imagenes[i])
                setArrayFotos(arrayFotos)
            }
        }
        if (archivos2.length>0){
            for (let i = 0; i < archivos2.length; i++) {
                const arch = archivos2[i];
                var formdata = new FormData();
                formdata.append("foto", arch);
        
                fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        arrayFotos.push(result.imageUrl)
                        setArrayFotos(arrayFotos)
                        if (i === (archivos2.length-1)){
                            actualizarCarrusel()
                        }
                    })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
            }
        }else{
            alert('Selecciona una foto');
        }
    }

    const actualizarCarrusel = async() => {
        var raw = JSON.stringify({
            "imagenes" : arrayFotos
            });
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${idEntidad}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
        .then(result => {
            alert('Foto subida');
            setArrayFotos([])
            window.location.reload()
        })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
            });
    }
    //------------------------------------------------------------------------------------------------------------
    const subirFotoIndividual = async(e) => {
        e.preventDefault()
        const input2 = document.getElementById('archivoIndividual');
        const archivos2 = input2.files[0];
        
        if (archivos2){
            var formdata = new FormData();
            formdata.append("foto", archivos2);
    
            fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/subirFoto', {
                method: 'POST',
                body : formdata
            }).then(response => response.json())
                .then(result =>{
                    setFoto(result.imageUrl)
                    console.log("Foto subida correctamente a cloudinary")
                    actualizarFotoIndividual()
                })
                .catch(error => {
                    console.error('Error al subir la imagen:', error);
                });
        }else{
            alert('Selecciona una foto');
        }
    }

    const actualizarFotoIndividual = async() => {
        var raw = JSON.stringify({
            "foto" : arrayFotos
            });
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/${idEntidad}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
        .then(result => {
            alert('Foto subida');
            setFoto()
            window.location.reload()
        })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
            });
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    {(entidad.imagenes && entidad.imagenes.length > 0) && 
                    <div>
                        <h3>Carrusel de imagenes</h3>
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" style={{width: '20%'}}>
                            <div className="carousel-inner">
                                {entidad.imagenes.map((imagen, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={imagen} className="d-block w-100" alt=" " style={{height: '30vmin'}} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <form id="formularioParte2" onSubmit={subirFotos}>
                        <div style={{flexdirection: 'row', width:'90%'}} >
                            <input type="file" className="form-control" id="archivos2" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg" multiple/>
                            <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row mt-5'>
                <div className="col 6">
                    <h3>Imagen individual</h3>
                    <img src={entidad.foto} style={{width:'50%'}}></img>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <form id="formularioParte2" onSubmit={subirFotoIndividual}>
                        <div style={{flexdirection: 'row', width:'90%'}} >
                            <input type="file" className="form-control" id="archivoIndividual" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg" multiple/>
                            <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default CompInicial