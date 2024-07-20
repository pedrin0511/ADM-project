import{useEffect, useState} from "react"

import styles from "./Projectform.module.css"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

function Projectform({btnText , handleSubmit, projectData}){

    const [Categories,setCategories] = useState([])
    const[Project , setProject] = useState(projectData || {})

useEffect(()=> {
    fetch("http://localhost:5000/Categories", {
        method:"GET",
        headers:{
            'Content-type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data)=> {
        setCategories(data)
    })
    .catch(err => console.log(err))
},[])

   
const submit = (e) =>{
    e.preventDefault()
    //console.log(Project)
    handleSubmit(Project)
}

function handLeChange(e){
    setProject({...Project,[e.target.name]: e.target.value})
    
}


function handLeCategory(e){
    setProject({...Project,category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
    }
    })
    
}

    return (
        <form onSubmit={submit} className={styles.form}>
            
            <Input type="text"
            text="Nome do projeto"
            name="name"
            placeholder="Insira o nome do projeto"
            handleOnChange={handLeChange}
            value={Project.name ? Project.name : ''}
            />

            <Input type="number"
            text="Orçamento do projeto"
            name="budget"
            placeholder="Insira o orçamento total"
            handleOnChange={handLeChange}
            value={Project.budget ? Project.budget : ''}
            />

           <Select name="Category_id"
            text="Selecione a categoria" 
            options={Categories} 
            handleOnChange={handLeCategory}
            value={Project.category ? Project.category.id : ''}
            />
            
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default Projectform