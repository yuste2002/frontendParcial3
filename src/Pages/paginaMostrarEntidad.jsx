import NavbarPage from "../Componentes/NavBar.js"
import CompMyUserInfo from "../Componentes/MyUserInfo.js"

function PaginaMostrarEntidad() {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <CompMyUserInfo></CompMyUserInfo>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaMostrarEntidad