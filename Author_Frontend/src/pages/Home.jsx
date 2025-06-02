import React, { useContext, useState } from "react";
import JournalCard from "../components/JournalCard";
import Loader from "../components/Loader";
import { contextProviderDeclare } from "../store/ContextProvider";


const Home = () => {
  
  const getContextObject=useContext(contextProviderDeclare);
  const {journals,loader}=getContextObject;
  return (
    <>
        {!loader ? <div className="container mt-4">
            {journals.map(journal => (
                <JournalCard key={journal.id} journal={journal} />
            ))}
        </div> : <Loader/>}
    </>
  );
};

export default Home;
