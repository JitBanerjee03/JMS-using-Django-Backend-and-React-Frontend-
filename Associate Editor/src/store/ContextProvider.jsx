import { createContext, useEffect, useReducer, useState } from "react";

export const contextProviderDeclare=createContext({
    isloggedIn:Boolean,
    setLoggedIn:()=>{},
    setEditor:()=>{},
    editor:{},
    journalAssign:[],
    setjournalAssign:()=>{},
    reviewers:[],
    unApprovedReviewers:[],
    fetchReviewers:()=>{}
});

const journalAssignReducer=(state,action)=>{
    return action.payload;   
}

export const ContextProvider=({children})=>{
    
    const [isloggedIn,setLoggedIn]=useState(false);
    const [editor,setEditor]=useState({});
    
    const [journalAssign,dispatchAssign]=useReducer(journalAssignReducer,[]);
    
    const [reviewers,setReviewerList]=useState([]);
    const [unApprovedReviewers,setUnApprovedReviewers]=useState([]);

    const setjournalAssign= async(editorId)=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/associate-editor/assigned-journals/${editorId}/`,{
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
    
        const fetchReviewers=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/unapproved/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        setUnApprovedReviewers(data);
    }

    useEffect(() => {
        const approvedReviewerList = async () => {
            try {
            const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/reviewer/approved/`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            });
            
            const data=await response.json();
            console.log(data)
            setReviewerList(data);
            } catch (err) {
            setError(err.message || "Failed to load journal");
            }
        };

        const checkTokenValidation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/associate-editor/validate-token/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEditor(data);
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
        approvedReviewerList();
        fetchReviewers();
    }, []);

    return(
        <contextProviderDeclare.Provider value={{isloggedIn,setLoggedIn,editor,setEditor,journalAssign,setjournalAssign,reviewers,unApprovedReviewers}}>
            {children}
        </contextProviderDeclare.Provider>
    )
}
