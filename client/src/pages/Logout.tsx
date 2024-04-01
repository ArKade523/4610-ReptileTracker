import { useDispatch } from 'react-redux'
import { setToken } from '../slices/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setToken(null))
        navigate('/login')
    }, [])

    return <Loading />
}

export default Logout
