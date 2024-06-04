"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Login from "../components/Login"
import Message from "../components/Message"
import { useSearchParams } from "next/navigation"
export default function Page() {
  const searchParams=useSearchParams();
  const [errorMessage, setErrorMessage]=useState("")
  return (
    <div>
      <Navbar selectedRoute='login' bg="bg-swhite shadow-xl"/>
      <div className="mt-24">
      <Message type={errorMessage?'Error':''} message={errorMessage}/>
      </div>
      <div className="flex items-center justify-center mt-4">
      <Login setErrorMessage={setErrorMessage} firstTime={searchParams.get('first')?searchParams.get('first'):true}/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}
