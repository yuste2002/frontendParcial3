import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CompEvento = () => {
    const { idEvento } = useParams()
    const [evento, setEvento] = useState({})
    var foto
        
    useEffect(() => {
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/${idEvento}`, {
        //fetch(`http://localhost:4000/eventos/${idEvento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()) // Agregando paréntesis aquí
        .then(data => {
            setEvento(data)
            console.log(data)
        })
        .catch(error => {
            console.error('Error al obtener evento concreto:', error);
        });
    }, [])


    const subirFotoIndividual = async(e) => {
        e.preventDefault()
        const input2 = document.getElementById('archivoIndividual');
        const archivos2 = input2.files[0];
        
        if (archivos2){
            var formdata = new FormData();
            formdata.append("foto", archivos2);
    
            fetch('https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/subirFoto', {
            //fetch('http://localhost:4000/eventos/subirFoto', {
                method: 'POST',
                body : formdata
            }).then(response => response.json())
                .then(result =>{
                    foto = result.imageUrl
                    console.log("Result: " + result.imageUrl)
                    console.log("Foto subida correctamente a cloudinary")
                    // Llamar a actualizarFotoIndividual después de que setFoto se haya completado
                    setTimeout(() => {
                        actualizarFotoIndividual();
                    }, 0);
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
            "imagen" : foto
            });
        fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/eventos/${idEvento}`, {
        
        //fetch(`http://localhost:4000/eventos/${idEvento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
        .then(result => {
            console.log("Evento: " + idEvento)
            console.log(result)
            console.log("Foto: " + foto)
            alert('Foto individual subida');
            foto = ""
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
                    <h2>Este es el evento {evento.nombre}</h2>
                    <img src={evento.foto} className='card-img-top' style={{width:'39%'}} /> <br></br>
                    <div className='row mt-5'>
                        <div className="col 6">
                            <img src={evento.imagen} style={{width:'50%'}}></img>
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
            </div>
        </div>
    )
}

export default CompEvento