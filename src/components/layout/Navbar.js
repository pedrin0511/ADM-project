import { Link } from "react-router-dom"
import Container from "./Container"
import styles from "./Navbar.module.css"
import logo from '../../img/image.png'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                <img src={logo} alt="cost" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/Projects'>Projects</Link></li>
                    <li className={styles.item}><Link to='/Contato'>Contato</Link></li>
                    <li className={styles.item}><Link to='/Company'>Empresa</Link></li>
                </ul>
            </Container>
      </nav>
    )
}

export default Navbar