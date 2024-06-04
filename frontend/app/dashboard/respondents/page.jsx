"use client";
import Link from "next/link";
import Dropdown from "@/app/components/Dropdown";
import Searchbar from "@/app/components/Searchbar";
import Testcard from "@/app/components/Testcard";
import Filtertests from "@/app/components/Filtertests";
import Respondentcard from "@/app/components/Respondentcard";
import { RespondentlistContext } from "@/app/context/RespondentlistState";
import Unauthorizederror from "@/app/components/Unauthorizederror";
import Message from "@/app/components/Message";
import { useEffect, useState, useContext } from "react";
export default function Respondents() {
  const [lists, setLists] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage]=useState("")
  const { list, setList } = useContext(RespondentlistContext);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      credentials: "include",
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/attempterlist`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log("attempterList data: ", data);
        if(Array.isArray(data)){
          setLists(data);
        }
        else if(data.status==401 || data.statusCode==401){
          setModalMessage("Authorization error! login again")
        }
        else if(data.message){
          setErrorMessage(data.message);
        }
        else{
          setErrorMessage(data.toString())
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString());
      });
  }, [setLists, setModalMessage, setErrorMessage]);
  return (
    <>
    <Unauthorizederror message={modalMessage} setMessage={setModalMessage}/>
    <Message type={errorMessage?"Error":""} message={errorMessage}/>
      <div className="flex lg:flex-row md:flex-row lg:space-y-0 md:space-y-0 space-y-3 flex-col justify-between">
        <div className="text-lg font-semibold text-spurple-300">
          Lists of respondents{" "}
          <span className="text-sgray-300">({lists.length})</span>
        </div>
        <Link href="/dashboard/respondentlist">
          <button
            onClick={() => {
              setList({
                create: true,
                id: "",
                title: "",
                description: "",
                attempters: [],
              });
            }}
            className="px-3 py-2 bg-spurple-300 text-swhite text-md font-medium rounded-lg"
          >
            New list
          </button>
        </Link>
      </div>
      {/* <Filtertests /> */}
      {lists.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {lists.map((singleList, index) => (
            <div key={index}>
              <Respondentcard
                id={singleList._id}
                date={singleList.createdAt}
                title={singleList.title}
                description={singleList.description}
                attempters={singleList.attempters}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen -mt-20 flex items-center justify-center">
          <div />
          <div className="text-sgray-300">
            No list created yet ? Create first
            <Link href="/dashboard/respondentlist">
              <button
                className="text-sgray-300 hover:text-spurple-300 hover:font-medium underline mx-2"
                onClick={() => {
                  setList({
                    create: true,
                    id: "",
                    title: "",
                    description: "",
                    attempters: [],
                  });
                }}
              >
                respondents list
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
