"use client"
import { createContext, useState } from "react";
export const RespondentlistContext=createContext();
const RespondentlistState=(props)=>{
    const listObj={
        create:true,
        id:'',
        title:'',
        description:'',
        attempters:[]
    }
    const [list,setList]=useState(listObj);
    return(
        <RespondentlistContext.Provider value={{list,setList}}>
            {props.children}
        </RespondentlistContext.Provider>
    )
}
export default RespondentlistState;