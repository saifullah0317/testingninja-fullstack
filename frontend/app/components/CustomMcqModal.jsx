"use client"
import React from "react";
import { useState } from "react";
import Message from "./Message";
export default function CustomMcqModal({ mcqs, setMcqs, currentTest, setChanged }) {
  const [options, setOptions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [optionText, setOptionText] = useState("");
  const [allowMultChoice, setAllowMultChoice] = useState(false);
  const [errorMessage, setErrorMessage]=useState("");
  function addOption() {
    setOptions([...options, optionText]);
    setOptionText("");
  }
  function exit() {
    if(!questionText || options.length<2){
      setErrorMessage("Please fill the required fields (question and atleast 2 options)");
    }
    else{
      if(currentTest._id){
        setChanged(true);
      }
      setErrorMessage("");
      setMcqs([
        ...mcqs,
        {
          question: questionText,
          allowMultChoice: allowMultChoice,
          options: options,
        },
      ]);
      setOptionText("");
      setQuestionText("");
      setOptions([]);
    }
  }
  return (
    <div>
      {/* Modal start*/}
      <div
        id="modal2"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
              <h3 className="text-xl font-semibold text-spurple-300 dark:text-white">
                Create multiple choice question
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="modal2"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 flex flex-col space-y-6">
              <input
                type="text"
                placeholder="Write question to add"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="rounded-lg text-spurple-300"
              />
              <div class="flex items-start">
                <input
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-spurple-300 border-spurple-300 rounded mt-1"
                  checked={allowMultChoice}
                  onChange={() => setAllowMultChoice(!allowMultChoice)}
                />
                <div className="flex flex-col items-start justify-start">
                  <span class="ms-2 text-md text-spurple-300 dark:text-gray-300">
                    Allow selecting more than one options
                  </span>
                  <span className="text-sm text-sgray-300">
                    Check it if more than one option could be the answer.
                  </span>
                </div>
              </div>
              <div
                className={
                  (options.length > 0 ? "" : "hidden") +
                  " text-md text-spurple-300 font-medium"
                }
              >
                <span>Options: </span>
                {options.map((option, index) => (
                  <span key={index}>{(index > 0 ? ", " : "") + option}</span>
                ))}
              </div>
              <div className=" flex justify-start">
                <input
                  type="text"
                  placeholder="Enter option"
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  className="rounded-l-lg"
                />
                <button
                  className="px-3 py-1 text-spurple-300 rounded-r-lg bg-swhite border border-spurple-300 hover:bg-spurple-300 hover:text-swhite"
                  onClick={addOption}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex items-center pr-4 pb-4 rounded-b justify-end">
              <button
                className="text-swhite bg-spurple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={exit}
              >
                Create
              </button>
              <button
                data-modal-hide="modal2"
                className="ms-3 text-sgray-300 bg-white rounded-lg border border-sgray-300 text-sm font-medium px-5 py-2.5"
              >
                Close
              </button>
            </div>
            <Message type={errorMessage?'Error':''} message={errorMessage}/>
          </div>
        </div>
      </div>
      {/* Modal end */}
    </div>
  );
}
