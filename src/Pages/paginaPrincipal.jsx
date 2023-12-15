import NavbarPage from "../Componentes/NavBar.js"
import CompUsersInfo from "../Componentes/EventosInfo.js"
import CompMapa from "../Componentes/Mapa.js"

function PaginaPrincipal() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <CompUsersInfo></CompUsersInfo>
                    </div>
                    <div className="col-8">
                        <h1>MAPA</h1> <br></br>
                        <CompMapa></CompMapa>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaPrincipal