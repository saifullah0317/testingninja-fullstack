"use client"
import { createContext, useState } from "react";
export const McqsContext=createContext();
const McqsState=(props)=>{
    const [mcqs,setMcqs]=useState([]);
    return(
        <McqsContext.Provider value={{mcqs, setMcqs}}>
            {props.children}
        </McqsContext.Provider>
    )
}
export default McqsState;