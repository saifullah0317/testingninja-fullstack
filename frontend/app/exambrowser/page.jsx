"use client";
import React from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ResponseContext } from "../context/ResponseState";
import { AnswersContext } from "../context/AnwersState";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
export default function Page() {
  const router = useRouter();
  const { currentResponse, setCurrentResponse } = useContext(ResponseContext);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function initiateResponse() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ email, key });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/checkkey`,
      requestOptions
    )
      .then(async (response) => await response.json())
      .then((result) => {
        if (result.testId && result.attempterId) {
          setCurrentResponse({key, attempterId:result.attempterId});
          router.push(`/exambrowser/attemptexam`);
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage(result.toString());
          console.log("from result: ", result);
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString());
        console.log(error);
      });
  }
  return (
    <div>
      <Navbar selectedRoute="exambrowser" bg="bg-swhite shadow-xl" />
      <div className={errorMessage?'mt-24':'hidden'}>
        <Message type="Error" message={errorMessage} />
      </div>

      <div className="flex flex-col space-y-5 w-fit mx-auto h-screen my-auto justify-center">
        <input
          type="text"
          className="rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          className="rounded-lg bg-sgray text-spurple-300 font-medium focus:ring-spurple-300 focus:border-spurple-300"
          placeholder="Test access-key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
        <button
          onClick={initiateResponse}
          className="mt-10 bg-spurple-300 text-swhite font-medium text-lg px-5 py-2 rounded-lg w-full flex justify-center"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}
