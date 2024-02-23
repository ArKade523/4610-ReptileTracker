import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" title="Home">
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                </li>
            </ul>
            <ul className="right-aligned">
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
