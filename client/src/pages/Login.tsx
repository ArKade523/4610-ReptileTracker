import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const sendLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.ok) {
            const user = await res.json()
            console.log(user) // TODO: save user to state
            navigate('/')
        } else {
            console.error('Login failed')
            setEmail('')
            setPassword('')
            setLoading(false)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            {loading && <Loading />}
            <form onSubmit={sendLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
