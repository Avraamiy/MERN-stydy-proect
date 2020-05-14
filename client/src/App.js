import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './componets/Navbar'
import 'materialize-css'
import {Loader} from "./componets/Laoder";


function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
        }}>
            <BrowserRouter>
                {isAuthenticated && <Navbar/>}
                <div className='container'>
                    {ready ? routes : <Loader/>}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
