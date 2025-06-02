import { useEffect } from "react";
import { useReducer } from "react";
import { createContext, useState } from "react";

export const contextProviderDeclare=createContext({
    isloggedIn:Boolean,
    setLoggedIn:()=>{},
    areaEditor:{},
    setAreaEditor:()=>{},
    reviewers:[],
    fetchReviewers:()=>{},
    approvedReviewers:[],
    fetchApprovedReviewers:()=>{},
    journalAssign:[],
    setjournalAssign:()=>{},
    editors:[],
    setEditor:()=>{}
});

const journalAssignReducer=(state,action)=>{
    return action.payload;   
}

const editorsReducer=(state,action)=>{
    return action.payload;  
}

export const ContextProvider=({children})=>{
    const [isloggedIn,setLoggedIn]=useState(false);
    const [areaEditor,setAreaEditor]=useState({});

    const [reviewers,setReviewers]=useState([]);
    const [approvedReviewers,setApprovedReviewers]=useState([]);
    
    const fetchReviewers=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/unapproved/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        setReviewers(data);
    }
    
    const fetchApprovedReviewers=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/approved/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        setApprovedReviewers(data);
    }
    
    const [journalAssign,dispatchAssign]=useReducer(journalAssignReducer,[]);

    const setjournalAssign= async(areaEditorId)=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/area-editor/journal-assignments/${areaEditorId}/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        const journalAssignAction={
            type:"SET_JOURNAL_ASSIGN",
            payload:data
        }

        dispatchAssign(journalAssignAction);
    }

    const [editors,dispatchEditors]=useReducer(editorsReducer,[]);

    const setEditors=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/associate-editor/get-all/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();
        console.log(data);
        const editorsAction={
            type:"SET_EDITOR",
            payload:data
        }

        dispatchEditors(editorsAction);
    }

    useEffect(()=>{

        const checkTokenValidation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/area-editor/validate-token/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAreaEditor(data);
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
        fetchReviewers();
        fetchApprovedReviewers();
        setEditors();
    },[])

    return (
        <contextProviderDeclare.Provider value={{isloggedIn,
        setLoggedIn,
        areaEditor,
        setAreaEditor,
        reviewers,
        fetchReviewers,
        approvedReviewers,
        fetchApprovedReviewers,
        journalAssign,
        setjournalAssign,
        editors,
        setEditors}}>
            {children}
        </contextProviderDeclare.Provider>
    )
}

