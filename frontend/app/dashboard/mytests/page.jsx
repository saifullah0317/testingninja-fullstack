"use client";
import Link from "next/link";
import Testcard from "@/app/components/Testcard";
import Filtertests from "@/app/components/Filtertests";
import { useEffect, useState, useContext } from "react";
import { TestContext } from "@/app/context/TestState";
import Unauthorizederror from "@/app/components/Unauthorizederror";
import Message from "@/app/components/Message";
export default function Mytests() {
  const {currentTest, setCurrentTest} = useContext(TestContext);
  const [tests, setTests] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, requestOptions)
      .then(async (response) => {
        const result=await response.json();
        if (Array.isArray(result)) {
          setTests(result);
        } else if (result.status == 401 || result.statusCode == 401) {
          setModalMessage("Authorization error ! Login again.");
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage(
            JSON.stringify(result) ? JSON.stringify(result) : result.toString()
          );
        }
      })
      .catch((error) => {
        console.log("error from catch of mytests: ",error)
        setErrorMessage(
          JSON.stringify(error) ? JSON.stringify(error) : error.toString()
        );
      });
  }, [setTests]);
  return (
    <>
      <Unauthorizederror message={modalMessage} setMessage={setModalMessage} />
      <div className="-mt-4 mb-2">
        <Message type={errorMessage ? "Error" : ""} message={errorMessage} />
      </div>
      <div className="flex lg:flex-row md:flex-row lg:space-y-0 md:space-y-0 space-y-3 flex-col justify-between">
        <div className="text-lg font-semibold text-spurple-300">
          My tests{" "}
          <span className="text-sgray-300">
            ({tests.length ? tests.length : <>0</>})
          </span>
        </div>
        <Link href="/dashboard/generatetest">
          <button className="px-3 py-2 bg-spurple-300 text-swhite text-md font-medium rounded-lg" onClick={() => { setCurrentTest({}) }}>
            New test
          </button>
        </Link>
      </div>
      {/* <div className="grid grid-cols-4 divide-x-0 bg-swhite py-2 px-3 space-x-3 rounded-lg mt-5">
        <div className="text-lg flex flex-row justify-between items-center">
          <span className="text-sgray-300">Category</span>
          <Dropdown text="All categories" />
        </div>
        <Link href="/" className="flex flex-row space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="22"
            height="22"
            viewBox="0 0 50 50"
            className="text-spurple-300"
            fill="currentColor"
          >
            <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
          </svg>
          <span className="text-spurple-300 text-lg">Manage categories</span>
        </Link>
        <div className="text-lg flex flex-row justify-end items-center">
          <span className="text-sgray-300 mr-5">Status</span>
          <Dropdown text="Both" />
        </div>
        <div className="items-center">
          <Searchbar />
        </div>
      </div> */}
      <Filtertests />
      {tests.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {tests.map((test, index) => (
              <Testcard test={test} key={index}/>
          ))}
        </div>
      ) : (
        <div className="h-screen -mt-40 flex items-center justify-center">
          <div />
          <div className="text-sgray-300">
            No test created yet ? Create first
            <Link href="/dashboard/generatetest">
              <button
                className="text-sgray-300 hover:text-spurple-300 hover:font-medium underline mx-2"
                onClick={() => { setCurrentTest({}) }}
              >
                test
              </button>
            </Link>{" "}
            now !
          </div>
          <div />
        </div>
      )}
    </>
  );
}
