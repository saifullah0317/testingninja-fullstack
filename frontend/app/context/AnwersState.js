"use client"
import { createContext, useState } from "react";
export const AnswersContext=createContext();
const AnswersState=(props)=>{
    const [answers, setAnswers]=useState({});
    return(
        <AnswersContext.Provider value={{answers, setAnswers}}>
            {props.children}
        </AnswersContext.Provider>
    )
}
export default AnswersState;