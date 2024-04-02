import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../hooks/isLoggedIn'
import { useEffect } from 'react'

function Home() {
    const navigate = useNavigate()

    const loggedIn = isLoggedIn()

    useEffect(() => {
        if (loggedIn) {
            navigate('/dashboard')
        }
    }, [loggedIn])

    return (
        <div>
            <h1>Welcome to Reptile Tracker!</h1>
            <h3>
                Reptile Tracker is an application that helps reptile owners keep track of their
                reptiles' feeding schedules, husbandry records, and more.
            </h3>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Sign Up</button>
        </div>
    )
}

export default Home
