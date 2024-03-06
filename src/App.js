import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


// import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Outlet, Link} from 'react-router-dom';



function App() {
  return (
      <div className="App">
          <NavBar bg="dark" variant="dark">
            <Container>

               <NavBar.Brand>
                  <Link to="/" className='nav-link'>React MERN Stack CRUD</Link>
               </NavBar.Brand>

               <Nav className="justify-content-end">
                  <Nav>
                    <Link to="/CreateStudent" className='nav-link'>Create</Link>
                  </Nav>
                  <Nav>
                    <Link to="/StudentList" className='nav-link'>List</Link>
                  </Nav>
               </Nav>

            </Container>
          </NavBar>

      <Container>
        <Row>
          <Col md="12">
            <div className="wrapper">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>  
      
    </div>
    
  );
}

export default App;
