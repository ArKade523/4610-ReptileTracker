import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const requireLoggedIn = () => {
    const authToken = useSelector((state: RootState) => state.auth.token)
    const navigate = useNavigate()
    useEffect(() => {
        if (!authToken) {
            navigate('/login')
        }
    }, [authToken])
}

export const isLoggedIn = () => {
    const authToken = useSelector((state: RootState) => state.auth.token)
    return !!authToken
}
