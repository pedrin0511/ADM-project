import { Link } from "react-router-dom"
import Container from "./Container"
import styles from "./Navbar.module.css"
import logo from '../../img/image.png'
import { useState } from "react"

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                <img src={logo} alt="cost" />
                </Link>
                <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`${styles.list} ${isOpen ? styles.open : ''}`}>
          <li className={styles.item} onClick={toggleMenu}><Link to="/">Home</Link></li>
          <li className={styles.item} onClick={toggleMenu}><Link to="/Projects">Projects</Link></li>
          <li className={styles.item} onClick={toggleMenu}><Link to="/Contato">Contato</Link></li>
          <li className={styles.item} onClick={toggleMenu}><Link to="/Company">Empresa</Link></li>
        </ul>
            </Container>
      </nav>
    )
}

export default Navbar