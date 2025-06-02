import { createContext, useEffect, useReducer, useState } from "react";

export const contextProviderDeclare=createContext({
    isloggedIn:Boolean,
    setLoggedIn:()=>{},
    setReviewer:()=>{},
    reviewer:{},
    journalReview:[],
    setjournalReview:()=>{}
});

const journalReviewReducer=(state,action)=>{
    return action.payload;   
}

export const ContextProvider=({children})=>{
    const [isloggedIn,setLoggedIn]=useState(false);
    const [reviewer,setReviewer]=useState({});
    
    const [journalReview,dispatchReview]=useReducer(journalReviewReducer,[]);
    
    const setjournalReview= async(reviewerId)=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/reviewer/${reviewerId}/assignments/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        const journalReviewAction={
            type:"SET_JOURNAL_REVIEW",
            payload:data
        }

        dispatchReview(journalReviewAction);
    }
    
    useEffect(()=>{
        const checkTokenValidation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/validate-token/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setReviewer(data);
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

        checkTokenValidation();
    },[]);

    return(
        <contextProviderDeclare.Provider value={{isloggedIn,setLoggedIn,setReviewer,reviewer,journalReview,setjournalReview}}>
            {children}
        </contextProviderDeclare.Provider>
    )
}