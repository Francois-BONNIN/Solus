import { ButtonCategories } from "../ButtonCategories";
import { ListMaterials } from "../ListMaterials";
import './listhome.css';

function ListHome() {
    return ( 
        <div className="container-home">
            <ButtonCategories/>
            <ListMaterials/>
        </div>
     );
}

export default ListHome;