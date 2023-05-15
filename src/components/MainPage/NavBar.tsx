import * as React from 'react'
import {Link, NavLink, NavLinkProps} from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap'
import '../../styling/Nav.css'


const NavBar: React.FC = () => {

    interface CustomNavLinkProps extends NavLinkProps{
        activeClassName: string;
    }

    return(
        <div>
            <Container fluid={true}>
            <Row>
                <Col>
                <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                
                }
                    to='/rain'
                >
                    Rain
                </NavLink>
                    {/* <Link className='Link-button' to = '/rain'>Rain</Link> */}
               
                
                </Col>    
                <Col>
                   <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                 
                    }
                    to='/temperature'
                >
                    Temperature
                </NavLink>
                </Col>  
                <Col>
                <NavLink
                    className={({isActive, isPending}) =>
                    isPending ? 'Link-button' : isActive ? 'active-link' : 'Link-button'                 
                    }
                    to='/wind'
                >
                    Wind
                </NavLink>
                </Col>          
            </Row>
            </Container>
      
                
             
        </div>
    )
}

export default NavBar