"use client"
import { createContext, useState } from "react";
export const QuestionsContext=createContext();
const QuestionsState=(props)=>{
    const [desQuestions,setDesQuestions]=useState([]);
    return(
        <QuestionsContext.Provider value={{desQuestions, setDesQuestions}}>
            {props.children}
        </QuestionsContext.Provider>
    )
}
export default QuestionsState;