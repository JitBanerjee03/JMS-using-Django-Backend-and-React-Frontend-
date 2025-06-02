import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const contextProviderDeclare=createContext({
    setLoggedIn:()=>{},
    isloggedIn:Boolean,
    handleSetAuthor:()=>{},
    journals:[],
    setJournals:()=>{},
    loader:Boolean,
    setAuthor:()=>{},
    author:{},
    handleAcceptedJournals:()=>{}
});

export const ContextProvider=({children})=>{
    
    //isloggedIn,setLoggedIn
    const [isloggedIn,setLoggedIn]=useState(false);

    const [author,setAuthor]=useState();

    const handleSetAuthor=(authorObj)=>{
        setAuthor(authorObj);
    }
    
    const [journals,setJournals]=useState([]);
    const [loader,setloader]=useState(true);
    
    useEffect(()=>{
        const getAcceptedJournals=async()=>{
            const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/accepted-journals/`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })
        
            const data=await response.json();
            setJournals(data);
            setloader(false);
        }

        const checkTokenValidation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/author/validate-token/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthor(data);
                    setLoggedIn(true);
                } else {
                    localStorage.removeItem('token');
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error("Token validation error:", error);
                localStorage.removeItem('token');
                setLoggedIn(false);
            }
        };
        
        getAcceptedJournals();
        checkTokenValidation();
    },[]);
    
    const handleAcceptedJournals=async()=>{
        setloader(true);
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/accepted-journals/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();
        setJournals(data);
        setloader(false);
    }

    return(
        <contextProviderDeclare.Provider value={{isloggedIn,setLoggedIn,handleSetAuthor,journals,setJournals,loader,author,setAuthor,handleAcceptedJournals}}>
            {children}
        </contextProviderDeclare.Provider>
    )
}