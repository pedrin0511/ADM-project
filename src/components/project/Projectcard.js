import styles from "./projectcard.module.css"
import {BsPencil , BsFillTrashFill} from "react-icons/bs"
import { Link } from "react-router-dom"

function Projectcard ({id, name,buget, category , handleRemove}){
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span>R${buget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category?.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.project_card_action}>
                <Link to="/">
                    <BsPencil/>editar
                </Link>
                <button><BsFillTrashFill/> excluir</button>
                    
                

            </div>
        </div>
    )
}

export default Projectcard