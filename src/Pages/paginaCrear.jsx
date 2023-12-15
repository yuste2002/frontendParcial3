import CompCrear from '../Componentes/Crear.js';
import NavbarPage from '../Componentes/NavBar.js';

function PaginaCrear () {
    
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <CompCrear></CompCrear>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaCrear