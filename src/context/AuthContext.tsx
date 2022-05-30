import React, { createContext, useReducer } from "react";
import { Usuario } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./authReducer";
import cafeApi from './../api/cafeApi';
import { LoginResponse, LoginData } from './../interfaces/AppInterfaces';
import { AxiosError } from "axios";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ( { children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    const signIn = async ({ correo, password } : LoginData ) => {
        try {

            const { data } = await cafeApi.post<LoginResponse>('/api/auth/login',{
                correo,
                password
            })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })
        } catch(error) {
            //const err = error as AxiosError;
            const err = error as any;
            //console.log(err.response?.data);
            console.log(err.response.data.msg);
            dispatch({
                type: 'addError',
                payload: err.response.data.msg || 'Check your information'
            })
        }      
    };
    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}