import { useState } from 'react'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        })

        if (res.ok) {
            const user = await res.json()
            console.log(user) // TODO: save user to state
            navigate('/')
        } else {
            console.error('Register failed')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            {loading && <Loading />}
            <form onSubmit={registerUser}>
                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
