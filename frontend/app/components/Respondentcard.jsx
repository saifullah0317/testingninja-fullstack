import React, { useEffect, useState, useContext } from "react";
import { convertDateFormat } from "../Helper";
import Deleteicon from "./Deleteicon";
import LinkIcon from "./LinkIcon";
import { RespondentlistContext } from "../context/RespondentlistState";
import Link from "next/link";
import { convertEmails } from "../Helper";
export default function Respondentcard({
  id,
  date,
  title,
  description,
  attempters,
}) {
  const {list,setList}=useContext(RespondentlistContext);
  return (
    <>
      <div className="bg-swhite hover:shadow-lg px-5 py-5 rounded-lg">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-md text-sgray-300 font-medium">
              Created: {date ? convertDateFormat(date) : <span>(not specified)</span>}
            </span>
            <Link href="/dashboard/respondentlist">
            <button onClick={()=>{
              setList({
                create:false,
                id,
                title,
                description,
                attempters:attempters.map((attempter)=>attempter.email)
              })
            }}>
              {/* <Deleteicon size={25} hover={true} /> */}
              <LinkIcon/>
            </button>
            </Link>
          </div>
          <span className="text-xl font-bold text-spurple-300">{title}</span>
          <span className="text-lg text-sgray-300 font-normal">
            {description ? description : `(no description)`}
          </span>
          <div>
            <span className="text-sgray-300">Respondents: </span>
            <Link href="/dashboard/respondentlist" className="text-spurple-300">
              <button onClick={()=>{
              setList({
                create:false,
                id,
                title,
                description,
                attempters:attempters.map((attempter)=>attempter.email)
              })
              }}>
              {convertEmails(attempters,45)}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
