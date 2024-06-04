"use client";
import React from "react";
import { useState } from "react";
import Message from "./Message";
export default function CustomQuestionModal({
  desQuestions,
  setDesQuestions,
  currentTest,
  setChanged
}) {
  const [questionText, setQuestionText] = useState("");
  const [startRange, setStartRange] = useState();
  const [endRange, setEndRange] = useState();
  const [errorMessage, setErrorMessage]=useState("");
  function exit() {
    if(!questionText){
      setErrorMessage("Please enter question.")
    }
    else if (((startRange || endRange) && !(startRange && endRange))) {
      setErrorMessage("Select both start and end range.");
    }
    else if(startRange<1 || endRange<1){
      setErrorMessage("Number of words cannot be less than one.")
    }
    else{
      if(currentTest._id){
        setChanged(true);
      }
      setErrorMessage("");
      setDesQuestions([
        ...desQuestions,
        {
          question: questionText,
          startRange: startRange,
          endRange: endRange,
        },
      ]);
      setQuestionText("");
      setStartRange();
      setEndRange();
    }
  }
  return (
    <div>
      {/* Modal start*/}
      <div
        id="modal1"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
              <h3 className="text-xl font-semibold text-spurple-300 dark:text-white">
                Create question
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="modal1"
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

            <div className="p-4 md:p-5 flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Write question to add"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="rounded-lg text-spurple-300"
              />
              <div className="flex justify-between items-center">
                <span className="text-sgray-300">
                  Add words range to answer (optional)
                </span>
                <div className="flex space-x-2 items-center">
                  {/* <span>from</span> */}
                  <input
                    type="number"
                    id="number-input1"
                    value={startRange}
                    onChange={(e) => setStartRange(e.target.value)}
                    aria-describedby="helper-text-explanation"
                    class="border border-spurple-300 text-spurple-300 text-sm rounded-lg block w-24 p-2"
                    placeholder="50"
                  />
                  <span className="">to</span>
                  <input
                    type="number"
                    id="number-input2"
                    value={endRange}
                    onChange={(e) => setEndRange(e.target.value)}
                    aria-describedby="helper-text-explanation"
                    class="border border-spurple-300 text-spurple-300 text-sm rounded-lg block w-24 p-2"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center p-4 md:p-5 rounded-b justify-end space-x-3">
              <button
                className="text-swhite bg-spurple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={exit}
              >
                Create
              </button>
              <button
                data-modal-hide="modal1"
                className="ms-3 text-sgray-300 bg-white rounded-lg border border-sgray-300 text-sm font-medium px-5 py-2.5"
              >
                Close
              </button>
            </div>
            <Message type={errorMessage?'Error':''} message={errorMessage} />
          </div>
        </div>
      </div>
      {/* Modal end */}
    </div>
  );
}
