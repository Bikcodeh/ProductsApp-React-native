import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterData, Usuario } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./authReducer";
import cafeApi from './../api/cafeApi';
import { LoginResponse, LoginData } from './../interfaces/AppInterfaces';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
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

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) return dispatch({ type: 'notAuthenticated'});

        const resp = await cafeApi.get('/api/auth')

        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated'});
        }

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })
        await AsyncStorage.setItem('token', resp.data.token);
    }


    const signIn = async ({ correo, password }: LoginData) => {
        try {

            const { data } = await cafeApi.post<LoginResponse>('/api/auth/login', {
                correo,
                password
            })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token', data.token)
        } catch (error) {
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
    const signUp = async ( data: RegisterData) => {
        try {
            const resp = await cafeApi.post<LoginResponse>('/api/usuarios', { ...data });
            if (resp.status !== 200) {
                return dispatch({ type: 'addError', payload: "Error processing data" })
            }
            AsyncStorage.setItem('token', resp.data.token);
            dispatch({ type: 'signUp', payload: { token: resp.data.token, user: resp.data.usuario }});

        } catch (error) {
            const err = error as any;
            dispatch({
                type: 'addError',
                payload: err.response.data.errors[0].msg || 'Check your information'
            })
        }
     };
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' })
    };
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
            {children}
        </AuthContext.Provider>
    )
}