"use client";
import React from "react";
import Link from "next/link";
import { read, utils, writeFile } from "xlsx";
import { useState, useContext, useEffect } from "react";
import Deleteicon from "@/app/components/Deleteicon";
import { useRouter } from "next/navigation";
import Message from "@/app/components/Message";
import Unauthorizederror from "@/app/components/Unauthorizederror";
import RespondentlistState from "@/app/context/RespondentlistState";
import { RespondentlistContext } from "@/app/context/RespondentlistState";
import ContextualSavebar from "@/app/components/ContextualSavebar";
import Loadingicon from "@/app/components/Loadingicon";

export default function Respondentlist() {
  const { list, setList } = useContext(RespondentlistContext);
  const router = useRouter();
  const [emails, setEmails] = useState(list.attempters);
  const [newEmail, setNewEmail] = useState("");
  const [modalMessage, setModalMessage]=useState("");
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [listname, setListname] = useState(list.title);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(list.description);
  const [changed, setChanged] = useState(false);
  function submitList() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: listname,
      description: description,
      attempters: emails,
    });
    console.log("listname: ", listname);
    console.log("emails: ", emails);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/attempterlist`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log("data: ",data);
        setLoading(false);
        if (data._id||(data.status && data.status < 400)) {
          setMessageType("Success");
          setMessageText(`List "${listname}" saved successfully!`);
          setListname("");
          setDescription("");
          setEmails([]);
          setNewEmail("");
          setTimeout(()=>{
            router.back();
          },1500)
        } else {
          if(data.statusCode==401 || data.status==401){
            setModalMessage("Authorization error, login again!")
          }
          else if (data.message) {
            setMessageType("Error");
            setMessageText(data.message);
          }
          else {
            setMessageType("Error");
            setMessageText(JSON.stringify(data));
          }
        }
      })
      .catch((error) => {
        console.log("catch error: ", error);
        setLoading(false);
        setMessageType("Error");
        setMessageText(JSON.stringify(error));
      });
  }
  function saveChanges() {
    console.log("listname: ",listname)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      id:list.id,
      title: listname,
      description,
      attempters: emails,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials:'include'
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/attempterlist/${list.id}`,
      requestOptions
    )
      .then(async (response) => response.json())
      .then((result) => {
        if(result._id){
          setMessageType("Success");
          setMessageText(`"${listname}" updated successfully.`);
          setTimeout(()=>{
            router.back();
          },1000)
        }
        else if(result.status==401 || result.statusCode==401){
          setModalMessage("Authorization error, login again!");
          setMessageType("Error");
          setMessageText("Authorization error, login again!");
        }
        else if(result.message){
          setMessageType("Error");
          setMessageText(result.message);
        }
        else{
          setMessageType("Error");
          setMessageText(result.toString());
        }
      })
      .catch((error) => {
        setMessageType("Error");
        setMessageText(error.toString());
      });
  }
  function undoChanges(){
    setListname(list.title);
    setDescription(list.description);
    setEmails(list.attempters);
    setChanged(false);
  }
  function deleteList(){
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      credentials:'include'
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/attempterlist/${list.id}`, requestOptions)
      .then(async (result) => {
        const resultData=await result.json();
        console.log("result: ",resultData);
        if(resultData._id){
          setMessageType("Success");
          setMessageText(`"${listname}" deleted successfully.`);
          setTimeout(()=>{
            router.back();
          },1000)
        }
        else if(resultData.statusCode==401 || resultData.status==401){
          // setModalMessage("Authorization error, login again!");
          setMessageType("Error");
          setMessageText("Authorization error, login again!");
        }
        else if(resultData.message){
          console.log("message available");
          setMessageType("Error");
          setMessageText(resultData.message);
        }
        else{
          console.log("message not available");
          setMessageType("Error");
          setMessageText(resultData.toString());
        }
      })
      .catch(error => {
        console.log("error in catch block: ",error);
        setMessageType("Error");
        setMessageText(error.toString());
      });
  }
  const handleImport = (event) => {
    const files = event.target.files;

    let updatedemails = []; // Create a temporary array to collect all rows

    let fileIndex = 0;
    const loadFile = (fileIndex) => {
      if (fileIndex < files.length) {
        const file = files[fileIndex];
        const reader = new FileReader();

        reader.onload = (event) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          let sheetIndex = 0;
          while (sheetIndex < sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[sheetIndex]]);
            updatedemails = [...updatedemails, ...rows];
            console.log("rows: ", emails);
            sheetIndex += 1;
          }

          // Load the next file
          loadFile(fileIndex + 1);
        };

        reader.readAsArrayBuffer(file);
      } else {
        updatedemails = updatedemails.map((email) => {
          console.log("singleEmail: ", email);
          return email.emails;
        });
        console.log("updatedEmails: ", updatedemails);
        // All files processed, update the state
        if (!list.create) {
          setChanged(true);
        }
        setEmails((prevemails) =>
          Array.from(new Set([...prevemails, ...updatedemails]))
        );
      }
    };

    // Start loading the first file
    loadFile(fileIndex);
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        {/* <ContextualSavebar/> */}
        <Message type={messageType} message={messageText} />
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium text-spurple-300 flex justify-start space-x-3 items-center">
            <Link href="/dashboard/respondents">
              <img
                width="15"
                height="15"
                src="https://img.icons8.com/510173/ios-filled/50/back.png"
                alt="back"
              />
            </Link>
            <span>{list.create ? "New" : "Edit"} respondents list</span>
          </div>
          <div className="flex items-center justify-end space-x-5">
            <button
              disabled={!list.create & !changed}
              className={
                (list.create ? "hidden" : "") +
                " px-5 py-2 rounded-lg text-md font-medium " +
                (!list.create & !changed
                  ? "bg-sgray-200 text-sgray-300"
                  : "bg-spurple-300 text-swhite")
              }
              onClick={()=>{undoChanges()}}
            >
              Undo changes
            </button>
            <button
              disabled={!list.create & !changed}
              // className="px-5 py-2 rounded-lg bg-spurple-300 text-swhite text-md font-medium"
              className={
                "px-5 py-2 rounded-lg text-md font-medium " +
                (!list.create & !changed
                  ? "bg-sgray-200 text-sgray-300"
                  : "bg-spurple-300 text-swhite")
              }
              onClick={() => {
                console.log("entering click event")
                if (list.create) {
                  console.log("list.create: true");
                  if (listname && emails) {
                    console.log("listname: ",listname);
                    console.log("emails: ",emails)
                    submitList();
                  } else {
                    console.log("show error")
                    setMessageType("Error");
                    setMessageText(
                      "Please fill the required inputs (List name and Emails list)"
                    );
                  }
                }
                else{
                  saveChanges()
                }
              }}
            >
              <div className={list.create & loading ? "flex" : "hidden"}>
                <Loadingicon/>
                <span>Saving...</span>
              </div>
              <span className={list.create & !loading ? "" : "hidden"}>
                Save list
              </span>
              <span className={list.create ? "hidden" : ""}>Save changes</span>
            </button>
            <button className={list.create ? "hidden" : ""} onClick={()=>{deleteList()}}>
              <Deleteicon size={40} hover={true} />
            </button>
          </div>
        </div>
        <div className="bg-swhite p-5 rounded-lg shadow-lg flex flex-col space-y-3">
          <span className="text-md font-medium text-spurple-300 mb-5">
            BASIC INFORMATION
          </span>
          <input
            type="text"
            placeholder="List name"
            className="rounded-lg"
            value={listname}
            onChange={(e) => {
              if (!list.create) {
                setChanged(true);
              }
              setListname(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description (optional notes visible only to you)"
            className="rounded-lg"
            value={description}
            onChange={(e) => {
              if (!list.create) {
                setChanged(true);
              }
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="bg-swhite p-5 rounded-lg shadow-lg">
          <span className="text-md font-medium text-spurple-300">
            EMAIL LIST
          </span>
          <div className="flex lg:flex-row md:flex-row flex-col space-y-5 items-start justify-between mt-5">
            <div className="flex flex-col space-y-10">
              <div>
                <p>Import email list from file</p>
                <p>
                  If you have a list of addresses in the CSV (*.xlsx, *csv)
                  format, upload it here:
                </p>

                <div className="mt-3">
                  <input
                    type="file"
                    id="emailsfile"
                    accept=".xlsx,.csv"
                    className="appearance-none file:bg-spurple-300 text-spurple-300"
                    onChange={handleImport}
                    multiple
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div>
                  <p>Add new email</p>
                  <p>{"Add respondents' email addresses manually"}</p>
                </div>
                <div className="flex justify-start">
                  <input
                    type="text"
                    placeholder="Email address"
                    className="rounded-l-lg"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  <button
                    className="px-3 py-1 border border-spurple-300 text-spurple-300 rounded-r-lg hover:bg-spurple-300 hover:text-swhite"
                    onClick={() => {
                      if (!list.create) {
                        setChanged(true);
                      }
                      setEmails(Array.from(new Set([newEmail, ...emails])));
                      setNewEmail("");
                      console.log("emails: ", emails);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div
              className={
                (emails.length > 0 ? "" : "hidden") + " flex flex-col space-y-3"
              }
            >
              {/* <div className="flex justify-start space-x-3 items-center">
            <Deleteicon size={25} hover={false} />
            <span className="text-sgray-300">Delete selected</span>
          </div> */}
              <div className="relative overflow-x-auto">
                <table className="w-fit text-sm text-left rtl:text-right text-spurple-300 font-medium">
                  <thead className="text-sm text-spurple-300 uppercase bg-spurple-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email Addresses
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {emails.map((email, index) => (
                      <tr key={index} className="bg-white border">
                        <th
                          scope="row"
                          className="px-6 py-3 font-medium text-spurple-300 whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-3">{email}</td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => {
                              if (!list.create) {
                                setChanged(true);
                              }
                              setEmails((currentEmails) =>
                                currentEmails.filter(
                                  (tempEmail, i) => i != index
                                )
                              );
                            }}
                          >
                            <Deleteicon size={25} hover={true} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Unauthorizederror message={modalMessage} setMessage={setModalMessage}/>
      {/* <Unauthorizederror showModal={showError} setShowModal={setShowError}/> */}
      {/* <Unauthorizederror showModal={showErrorForDelete} setShowModal={setShowErrorForDelete}/> */}
    </>
  );
}
