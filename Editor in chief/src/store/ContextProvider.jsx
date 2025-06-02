import { useEffect } from "react";
import { useReducer } from "react";
import { createContext, useState } from "react";

export const contextProviderDeclare=createContext({
    isloggedIn:Boolean,
    setLoggedIn:()=>{},
    chiefEditor:{},
    setChiefEditor:()=>{},
    getAcceptedJournals:()=>{},
    journals:[],
    submittedJournal:[],
    fetchSubmittedJournal:()=>{},
    areaEditors:[],
    fetchAllAreaEditors:()=>{},
    subjectAreasList:[]
    //http://localhost:8000/journal/subject-areas/
});

const areaEditorReducer=(state,action)=>{
    return action.payload;   
}

export const ContextProvider=({children})=>{
    
    const [isloggedIn,setLoggedIn]=useState(false);
    const [chiefEditor,setChiefEditor]=useState({});
       
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
    
    const [submittedJournal,setSubmittedJournal]=useState([]);

    const fetchSubmittedJournal=async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/not-accepted-or-rejected/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        setSubmittedJournal(data);
    }

    const [areaEditors,areaEditorDispatch]=useReducer(areaEditorReducer,[]);
    
    const fetchAllAreaEditors= async()=>{
        const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/area-editor/get-all/`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

        const data=await response.json();

        const areaEditorAction={
            type:"SET_AREA_EDITOR",
            payload:data
        }

        areaEditorDispatch(areaEditorAction);
    }
    
    const [subjectAreasList,setSubjectAreasList]=useState([]);
    
    useEffect(()=>{
        const fetchAllSubjectareas=async()=>{
            const response=await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/journal/subject-areas/`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })

            const data=await response.json();

            setSubjectAreasList(data);
        }

        const checkTokenValidation = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoggedIn(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_BACKEND_DJANGO_URL}/editor-chief/validate-token/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setChiefEditor(data);
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
        fetchAllSubjectareas();
    },[])

    return (
        <contextProviderDeclare.Provider value={{isloggedIn,
        setLoggedIn,
        chiefEditor,
        setChiefEditor,
        getAcceptedJournals,
        journals,
        submittedJournal,
        fetchSubmittedJournal,
        areaEditors,
        fetchAllAreaEditors,
        subjectAreasList
        }}>
            {children}
        </contextProviderDeclare.Provider>
    )
}

