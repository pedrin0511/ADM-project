import {BrowserRouter  as Router , Routes , Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Company from './components/pages/Company';
import Newproject from './components/pages/Newproject';
import Container from './components/layout/Container';
import Navbar from'./components/layout/Navbar'
import Footer from './components/layout/Footer';
import Projects from './components/pages/projects';
import Project from './components/pages/project';

export default function App() {
  return (
    <Router>
      <Navbar/>

      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path='/Projects' Component={Projects}/>
          <Route path='/Company' Component={Company}/>
          <Route path='/Contato' Component={Contato}/>
          <Route path='/Newproject' Component={Newproject}/>
          <Route path='/project/:id' Component={Project}/>
        </Routes>
      </Container>

      <Footer/>
    </Router>
  );
}

