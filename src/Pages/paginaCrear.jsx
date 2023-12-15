import CompEntidad from '../Componentes/Entidad.js';
import NavbarPage from '../Componentes/NavBar.js';

function PaginaCrear () {
    
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <CompEntidad></CompEntidad>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaCrear