import {parse , v4 as uuidv4} from 'uuid'
import styles from "./project.module.css"
import { useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import Loading from '../layout/Load'
import Container from '../layout/Container'
import Projectform from "../project/Projectform"
import ServiceForm from "../service/serviceForm"
import Message from '../layout/message'
import ServiceCard from '../service/serviceCard'


function Project(){

const {id} = useParams()

const[ project ,setproject] = useState([])
const[services , setservices] = useState([])
const [showproject  , setshowproject] = useState(false)
const [showserviceform  , setshowserviceform] = useState(false)
const [message,setmessage] = useState()
const [type, settype] = useState()

useEffect(() => {

setTimeout(() =>{
    fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
        },
    })
    .then(resp => resp.json())
    .then((data) => {
        setproject(data)
        setservices(data.services)
    })
    .catch(err => console.log(err))
}, 800)

} ,[id])

function editPost(project){

    setmessage('')

    if(project.budget < project.cost){
        setmessage('O orçamento não pode ser menor que o custo do projeto')
        settype('error')
        return false
    }

   fetch(`http://localhost:5000/projects/${id}` , {
        method: 'PATCH',
        headers:{
            'Content-type':'application/json',
        },
        body : JSON.stringify(project),
   })
   .then(resp => resp.json())
   .then((data) => {
        setproject(data)
        setshowproject(false)
        setmessage('Projeto atualizado')
        settype('success')

   })
   .catch(err => console.log(err))
}

function toggleProjectForm(){
    setshowproject(!showproject )
}

function toggleServiceForm(){
    setshowserviceform(!showserviceform )
}

function createService(project){

    setmessage('')
    
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)){
        setmessage('Orçamneto ultrapassado!')
        settype('error')
        project.services.pop()
        return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(project)
    })
    .then((resp) => resp.json())
    .then((data) =>{
        setshowserviceform(false)
    })
    .catch(err => console.log(err))

}

function removeServe(id, cost) {
    // Filtra os serviços para remover o serviço com o id especificado
    const serviceUpdate = project.services.filter(
        (service) => service.id !== id
    );

    // Cria uma cópia do projeto atual e atualiza os serviços e o custo
    const projectUpdate = { ...project, services: serviceUpdate };
    projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);

    // Envia a requisição PATCH para atualizar o projeto no servidor
    fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectUpdate) // Certifica-se de enviar o corpo da requisição
    })
    .then((resp) => resp.json())
    .then((data) => {
        setproject(projectUpdate);
        setservices(serviceUpdate);
        setmessage('Serviço removido com sucesso!');
    })
    .catch(err => console.log(err));
}


return <>{project.name ? (
    <div className={styles.project_details}>
        
            {message && <Message type={type} msg={message}/>}
            <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>
                {!showproject ? "Editar projeto" : "Fechar"}
                </button>
                {!showproject ? (
                    <div className={styles.project_info}>
                        <p>
                         <span> Categoria:</span>{project.category.name}
                        </p>
                        <p>
                            <span>Total de orçamento: </span>R${project.budget}
                        </p>
                        <p>
                            <span>Total de utilizado: </span>R${project.cost}
                        </p>
                    </div>
                ) : (
                    <div  className={styles.project_info}>
                        <Projectform handleSubmit={editPost} btnText="Criar projeto"/>
                    </div>
                )}
            </div>
            
        
        <div className={styles.service_from_container}>
                <h2> Adicionar um serviço:</h2>
                <button className={styles.btn} onClick={toggleServiceForm}>
                {!showserviceform ? "Adicionar serviço" : "Fechar"}
                </button>
                <div className={styles.project_info}>
                    {showserviceform && (
                        <ServiceForm 
                        handleSubmit={createService}
                        btnText='Adicionar serviço'
                        projectData={project}
                        />
                    )}
                </div>
            </div>
            <h2>Serviços</h2>
            <Container customClasse="start">
            {services.length > 0 &&
                services.map((service) =>(
                    <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeServe}
                    />
                ))
            }
            {services.length === 0 && <p>Não ha projetos cadastrados</p>}
            </Container>
    </div>)
    : (<Loading/>)}</>
}

export default Project