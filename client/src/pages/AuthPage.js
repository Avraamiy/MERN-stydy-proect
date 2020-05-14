import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()

    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request(`/api/auth/register`, 'POST', {...form})
            message(data.message)
        } catch (e) {
            console.log(e)
        }

    }

    const loginHandler = async event => {
        try {
            const data = await request(`/api/auth/login`, 'POST', {...form})
            // console.log(data)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1> Shorten Link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authenticated</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Input email"
                                       id="email" type="email"
                                       name="email"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Email:</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Input password"
                                       id="password" type="password"
                                       name="password"
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Password:</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn orange lighten-3 darken-4'
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sing In
                        </button>
                        <button
                            className='btn grey light-1 black-text'
                            onClick={registerHandler}

                        >
                            Create account
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}