import styles from './home.module.css'

import savings from '../../img/savings.svg'
import Linkbutton from '../layout/Linkbutton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo <span>Costs</span></h1>
            <p>Comece a gerenciar seu projeto agora mesmo</p>
            <Linkbutton to="/newproject" text="Criar projeto"/>
            <img src={savings} alt="costs"/>
        </section>
    )
}

export default Home