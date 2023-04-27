import * as React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap'
import '../../styling/Nav.css'

const NavBar = () => {

    return(
        <nav>
            <Container fluid={true}>
            <Row>
                <Col>
                    <Link className='Link-button' to = '/rain'>Rain</Link>
                </Col>    
                <Col>
                     <Link className='Link-button' to ='/temperature'>Temperature</Link>
                </Col>  
                <Col>
                    <Link className='Link-button' to='/wind'>Wind</Link>
                </Col>          
            </Row>
            </Container>
      
                
             
        </nav>
    )
}

export default NavBar