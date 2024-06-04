"use client"
import { createContext, useState } from "react";
export const ResponseContext=createContext();
const ResponseState=(props)=>{
    const [currentResponse, setCurrentResponse]=useState({});
    return(
        <ResponseContext.Provider value={{currentResponse, setCurrentResponse}}>
            {props.children}
        </ResponseContext.Provider>
    )
}
export default ResponseState;