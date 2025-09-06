import React from 'react'
import { useUser } from '../contexts/user.context'
import { Navigate } from 'react-router-dom';

const Protected = ({children}:{children: React.ReactNode}) => {
    const {user} = useUser();
    if(!user){
        return <Navigate to={"/sign-in"} replace/>
    }
    return children
}

export default Protected