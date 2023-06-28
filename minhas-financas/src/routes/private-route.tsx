import React from "react"
import useTokenStorage from "../hooks/token/use-token-storage"
import { Navigate } from "react-router-dom";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");


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
    const { getToken, removeToken } = useTokenStorage();

    const token = getToken();

    if (!token) {
        alert("Sua sessão expirou. Você precisa se autenticar novamente!");

        return (
            <Navigate
                to={"/Login"}
                replace
            />
        )
    };

    if (!!token && dayjs().isAfter(token.expiresIn)) {
        removeToken();

        return (
            <Navigate
            to={"/Login"}
            replace
        />
        )
    } 

    return (
        children
    )
}

export default PrivateRoute;