import Message from "../layout/message"
import { useLocation } from "react-router-dom"
import Container from "../layout/Container"
import Linkbutton from "../layout/Linkbutton"

import styles from './projects.module.css'

function Projects() {
    const location = useLocation()
    let message = ''
    
    if (location.state) {
        message = location.state.message
    }
    
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <Linkbutton to="/newproject" text="Criar projeto"/>
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass="start">
                <p>PROJETOS...</p>
           </Container>
        </div>
    )
}

export default Projects