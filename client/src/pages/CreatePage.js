import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const CreatePage = () => {
    const [inputText, setInputText] = useState('')
    const history = useHistory()
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const changeHandler = event => {
        setInputText(event.target.value)
    }
    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/links/generate',
                    'POST', {from: inputText},
                    {Authorization: `Bearer ${token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                console.log(e)
            }
        }
    }


    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    return (
        <div className='row '>
            <div className='col s8 offset-s2 ' style={{paddingTop: '2rem'}}>
                <div className="input-field ">
                    <input placeholder="Input link"
                           id="link"
                           type="text"
                           onChange={changeHandler}
                           value={inputText}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="email">Link:</label>
                </div>
            </div>
        </div>

    )
}