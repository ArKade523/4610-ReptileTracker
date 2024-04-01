import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './index.css'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Home from './pages/Home.tsx'
import { Provider, useSelector } from 'react-redux'
import store, { RootState } from './store.ts'
import { Api, ApiContext } from './utils/api.ts'
import Logout from './pages/Logout.tsx'

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'logout', element: <Logout /> }
        ]
    }
])

function Main() {
    const authToken = useSelector((state: RootState) => state.auth.token)
    const apiRef = useRef(new Api(authToken))

    useEffect(() => {
        if (apiRef.current) {
            apiRef.current.authToken = authToken
        }
    }, [authToken])

    return (
        <ApiContext.Provider value={apiRef.current}>
            <RouterProvider router={router} />
        </ApiContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Main />
    </Provider>
)
