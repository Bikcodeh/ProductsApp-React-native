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

            const resp = await cafeApi.post<LoginResponse>('/api/auth/login',{
                correo,
                password
            })

            console.log(resp.data);
        }catch(error) {
            const err = error as AxiosError;
            console.log(err.response?.data);
        }      
    };
    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {};

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