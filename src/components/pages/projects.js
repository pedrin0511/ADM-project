import Message from "../layout/message"
import { useLocation } from "react-router-dom"
import Container from "../layout/Container"
import Linkbutton from "../layout/Linkbutton"
import Projectcard from "../project/Projectcard"
import styles from './projects.module.css'
import { useState , useEffect } from "react"
import Loading from '../layout/Load'

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoad, setRemoveLoad] = useState(false);
    const location = useLocation();
    const[projectmessage , setprojectmessage] = useState('')
    let message = '';
  
    if (location.state) {
      message = location.state.message;
    }
  
    useEffect(() => {
      setTimeout(() => {
        fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setProjects(data);
            setRemoveLoad(true);
          })
          .catch((err) => console.log(err));
      }, 1000);
    }, []);


    //remover projeto
    function removeProject(id){
      fetch(`http://localhost:5000/projects/${id}`,{
        method:'DELETE',
        headers:{
          'Content-type' : 'application/json'
        },
      })
      .then(resp => resp.json())
      .then(data =>{
        setProjects(projects.filter((project)=> project.id !== id))
        setprojectmessage('Projeto removido com sucesso!')
      })
      .catch(err => console.log(err))
    } 
  
    return (
      <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>Meus projetos</h1>
          <Linkbutton to="/newproject" text="Criar projeto" />
        </div>
        {message && <Message type="success" msg={message} />}
        {projectmessage && <Message type="error" msg={projectmessage} />}
        <Container customClass="start">
          {projects.length > 0 &&
            projects.map((project) => (
              <Projectcard
                name={project.name}
                id={project.id}
                budget={project.budget}
                category={project.category?.name} // Verificação de segurança
                key={project.id}
                handleRemove={removeProject}
              />
            ))}
          {!removeLoad && <Loading />}
          {removeLoad && projects.length === 0 && (
            <p>Não há projetos cadastrados</p>
          )}
        </Container>
      </div>
    );
  }
  
  export default Projects;