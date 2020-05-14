import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import {Loader} from "../componets/Laoder"
import {LinkCard} from "../componets/LinkCard"

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(
                `/api/links/${linkId}`,
                'GET',
                null,
                {Authorization: `Bearer ${token}`})
            setLink(fetched)
        } catch (e) {
            console.log(e)
        }

    }, [linkId, token, request, setLink])
    useEffect(() => {
        getLink()
    }, [getLink])
    if (loading) {
        return <Loader/>
    }
    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>

    )
}