import {useCallback} from 'react'


export const useMessage = () => {
    return useCallback(message => {
        if (window.M && message) {
            window.M.toast({html: message})
        }
    }, [])
}