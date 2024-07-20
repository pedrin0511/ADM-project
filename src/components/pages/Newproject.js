import Projectform from "../project/Projectform"
import styles from "./Newprojects.module.css"
import { useNavigate } from "react-router-dom"

function Newproject() {
    const navigate = useNavigate()

    function createpost(project) {
        // Inicializar cost e serviços
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            navigate("/projects", { state: { message: "Projeto criado com sucesso!" } })
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.newptoject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Projectform handleSubmit={createpost} btnText="Criar projeto"/>
        </div>
    )
}

export default Newproject