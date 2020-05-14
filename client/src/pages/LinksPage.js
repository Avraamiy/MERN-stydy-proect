import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../componets/Laoder'
import {LinksList} from '../componets/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchLinks = useCallback(async () => {
        const fetched = await request('/api/links/', 'GET', null, {Authorization: `Bearer ${token}`})

        setLinks(fetched)
    }, [request, token])
    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if(!links.length) {
        return <p className={'center'}>No links yet</p>
    }
    return (
        <>
            {loading ? <Loader/> : <LinksList links={links}/>}
        </>
    )
}