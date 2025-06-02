import { useContext, useEffect } from "react";
import { contextProviderDeclare } from "../store/ContextProvider";
import SubmittedJournalEmptyMessage from "../components/SubmittedJournalEmptyMessage";
import SubmittedJournal from "../components/SubmittedJournal";

const SubmittedArticle=()=>{
    const {submittedJournal,fetchSubmittedJournal}=useContext(contextProviderDeclare);

    useEffect(()=>{
        fetchSubmittedJournal();
    },[])
    
    console.log(submittedJournal);

    return (
        <>
            {submittedJournal.length===0 ? <SubmittedJournalEmptyMessage/> : <SubmittedJournal submittedJournal={submittedJournal}/>}
        </>
    )
}

export default SubmittedArticle;