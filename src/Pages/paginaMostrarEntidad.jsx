import NavbarPage from "../Componentes/NavBar.js"
import CompUsersInfo from "../Componentes/UsersInfo.js"

function PaginaMostrarEntidad() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <CompUsersInfo></CompUsersInfo>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaMostrarEntidad