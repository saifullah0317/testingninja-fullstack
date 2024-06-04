"use client"
import { createContext, useState } from "react";
export const TestContext=createContext();
const TestState=(props)=>{
    const [currentTest, setCurrentTest]=useState({id:''});
    return(
        <TestContext.Provider value={{currentTest, setCurrentTest}}>
            {props.children}
        </TestContext.Provider>
    )
}
export default TestState;