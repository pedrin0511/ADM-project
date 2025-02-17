import styles from './Linkbutton.module.css'
import { Link } from "react-router-dom"

function Linkbutton({to,text}){
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default Linkbutton