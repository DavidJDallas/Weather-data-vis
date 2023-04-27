import * as React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {

    return(
        <nav>
            <ul>
            <li>
                <Link to = '/rain'>Rain</Link>
            </li>
            <li>
                <Link to ='/temperature'>Temperature</Link>
            </li>
            <li>
                <Link to='/wind'>Wind</Link>
            </li>

                
                
                
            </ul>
        </nav>
    )
}

export default NavBar