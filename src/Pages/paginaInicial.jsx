import NavbarPage from "../Componentes/NavBar.js"
import CompInicial from "../Componentes/Inicial.js"

function PaginaInicial() {
    

    return(
        <div className='container-fluid'>
            <NavbarPage></NavbarPage>
            <CompInicial></CompInicial>
        </div>
    )
}


export default PaginaInicial