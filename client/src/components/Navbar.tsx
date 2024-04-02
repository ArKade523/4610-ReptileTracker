import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../hooks/isLoggedIn'

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
                {isLoggedIn() ? (
                    <>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        <li>
                            <Link to="/profile" title="Profile">
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
