import CompMyInfo from "../Componentes/MyInfo.js";
import NavbarPage from "../Componentes/NavBar.js";

function PaginaMyInfo () {
    return(
        <div>
            <NavbarPage></NavbarPage>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <CompMyInfo></CompMyInfo>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaginaMyInfo