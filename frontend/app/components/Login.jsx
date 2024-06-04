"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login({setErrorMessage, firstTime=true}) {
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  function handleLogin(){
    if(!email || !psw){
      setErrorMessage("Please enter email and password to login.")
    }
    else{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: email,
      password: psw
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      credentials: 'include',
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, requestOptions)
      .then(async (response) => response.json())
      .then((result) => {
        if(result.token){
          if(firstTime=='false'){
            router.back();
          }
          else{
            router.push("/dashboard/mytests");
          }
        }
        else{
          if(result.message){
            setErrorMessage(result.message);
          }
          else{
            setErrorMessage(result.toString()?result.toString():JSON.stringify(result));
          }
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString()?error.toString():JSON.stringify(error));
        console.log("error in catch: ",error)
      });
    }
  }
  return (
    <div className="w-96 border-swhite shadow-2xl rounded-lg py-10 px-10 flex flex-col space-y-6">
      <div className="flex flex-col mb-6">
        <span className="text-3xl text-spurple-300 font-bold text-center">
          testingninja
        </span>
        <span className="text-lg text mt-3 text-center text-spurple-300">
          Login to Your Account
        </span>
      </div>
      <input
        type="email"
        className="rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
        placeholder="Email address"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
      />
      <input
        type="password"
        className="rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
        placeholder="Password"
        value={psw}
        onChange={(e)=>{setPsw(e.target.value)}}
      />
      <span className="text-spurple-300 text-center">Forgot your password?</span>
      <div className="h-12" />
      <div className="flex flex-row justify-between items-center">
        <Link href="/signup">
          <span className="text-lg font-semibold text-spurple-300">
            Create Account
          </span>
        </Link>
        <button className="bg-spurple-300 rounded-lg text-swhite text-lg font-semibold py-2 px-5" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
