"use client"
import Navbar from "../components/Navbar"
import Signup from "../components/Signup"
import Message from "../components/Message"
import { useState } from "react"
export default function Page() {
  const [errorMessage, setErrorMessage]=useState("");
  return (
    <div>
      <Navbar selectedRoute='signup' bg="bg-swhite shadow-xl"/>
      <div className="mt-24">
      <Message type={errorMessage?'Error':''} message={errorMessage}/>
      </div>
      <div className="flex items-center justify-center mt-4">
      <Signup setErrorMessage={setErrorMessage}/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}
