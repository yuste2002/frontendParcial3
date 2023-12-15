import CompEvento from "../Componentes/Evento.js";
import NavbarPage from "../Componentes/NavBar.js";

function PaginaEvento () {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <CompEvento></CompEvento>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaEvento