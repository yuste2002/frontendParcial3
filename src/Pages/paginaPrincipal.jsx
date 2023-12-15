import CompPrincipal from "../Componentes/Principal.js"
import NavbarPage from "../Componentes/NavBar.js"

function PaginaPrincipal () {

    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <CompPrincipal></CompPrincipal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaPrincipal