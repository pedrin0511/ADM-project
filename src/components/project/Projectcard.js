import styles from "./projectcard.module.css"
import {BsPencil , BsFillTrashFill} from "react-icons/bs"
import { Link } from "react-router-dom"

function Projectcard ({id, name,budget, category , handleRemove}){

    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span>R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category?.toLowerCase()]}`}></span>{category}
            </p>
            <div className={styles.project_card_action}>
                <Link to={`/project/${id}`}>
                    <BsPencil/>editar
                </Link>
                <button onClick={remove}><BsFillTrashFill/> excluir</button>
                    
                

            </div>
        </div>
    )
}

export default Projectcard