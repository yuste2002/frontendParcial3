import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const navigate = useNavigate()

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "243011194761-u3mtrle5guk2nq217ppt4nqcf2m03u8p.apps.googleusercontent.com",
            callback: handleCallBackResponse
        });

        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("singInDiv"),
            {theme: "outline", size:"large"}

        );
        
    }, []);

    function handleCallBackResponse (response){
        console.log("Encode JWT: "+  response.credential)
        //fetch(`https://backend-parcial3-alvaros-projects-aa3f751a.vercel.app/entidades/loginToken/${response.credential}`, {
            fetch(`http://localhost:4000/entidades/loginToken/${response.credential}`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                if (data){
                    data.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data));
                    window.location.href="/principal/"
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                }
                        
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    function handleSingOut (e) {
        google.accounts.id.signOut().then(function () {
            console.log('User signed out.');
            });
    }


    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col'>
                    <div id='singInDiv'></div>
                </div>
            </div>
        </div>
    )
}

export default CompLogin 