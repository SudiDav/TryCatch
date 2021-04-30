import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore{
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('token'); // the window... tries to get the token from out localstorage
    appLoaded = false;

    constructor(){
        makeAutoObservable(this)

        // this only react to when the token is changed.
        // it does not run when store initially load
        // it only runs when there is a change to the token
        reaction(
           () => this.token,
            token =>{
                if(token){
                    window.localStorage.setItem('token', token)
                }else{
                    window.localStorage.removeItem('token')
                }
            }
        )
    }

    setServerError = (error: ServerError) =>{
        this.error = error;
    }

    setToken =(token: string | null) =>{
        this.token = token
    }

    setAppLoaded =() =>{
        this.appLoaded = true
    }
}