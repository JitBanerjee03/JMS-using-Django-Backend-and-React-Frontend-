import { createContext, useState } from "react";

export const ContextProviderDeclare=createContext({
    journals:[],
    getAcceptedJournals:()=>{}
});

export const ContextProvider=({children})=>{
    
    const [journals,setJournals]=useState([]);
    
    const getAcceptedJournals=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/accepted-journals/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })
    
        const data=await response.json();
        setJournals(data);
    }

    return (
        <ContextProviderDeclare value={{journals,getAcceptedJournals}}>
            {children}
        </ContextProviderDeclare>
    )
}

