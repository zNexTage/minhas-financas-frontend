import React, { useEffect } from "react"
import useTokenStorage from "../hooks/token/use-token-storage"
import { Navigate } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}

/**
 * A wrapper to use in private routes. 
 * Allow route access, otherwise redirect to login page
 *  
 * @param {IProps} 
 * @returns 
 */
const PrivateRoute = ({ children }: IProps) => {
    const { getToken } = useTokenStorage();

    const token = getToken();

    const isAuthenticated = !!token;

    useEffect(()=>{
        return () => {
            if(!isAuthenticated){
                alert("Sua sessão expirou. Você precisa se autenticar novamente!");
            }
        }
    }, []);

    return (
        isAuthenticated ?
            children :
            <Navigate
                to={"/Login"}
                replace
            />
    )
}

export default PrivateRoute;