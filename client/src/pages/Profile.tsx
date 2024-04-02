import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import { useApi } from '../hooks/useApi'
import { setUser } from '../slices/authSlice'

function Profile() {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const api = useApi()

    useEffect(() => {
        if (!user) {
            api.get('/users/me').then((user) => {
                dispatch(setUser(user))
            })
        }
    }, [])

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <>
                    <h2>
                        Name: {user?.Profile?.first_name} {user?.Profile?.last_name}
                    </h2>
                    <h3>Email: {user?.email}</h3>
                </>
            )}
        </div>
    )
}

export default Profile
