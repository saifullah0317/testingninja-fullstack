import React from "react";
import Message from "./Message";
import { useState } from "react";
import Loadingicon from "./Loadingicon";
// import { PDFDocument } from "pdfjs-dist";
// import { PDFDocumentProxy } from "pdfjs-dist";
export default function QuestionPoolModal({ desQuestions, setDesQuestions, currentTest, setChanged }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [withPrompt, setWithPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mcqs, setMcqs] = useState();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  //   const [files, setFiles] = useState([]);
  const [pdfContent, setPdfContent] = useState("");
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;
      // const pdf = await PDFDocument.load(contents);
      // const pages = pdf.getPages();
      // let extractedText = "";

      // for (const page of pages) {
      //   const textContent = await page.getTextContent();
      //   const pageText = textContent.items.map((item) => item.str).join(" ");
      //   extractedText += pageText;
      // }

      // setPdfContent(extractedText);
      // console.log("pdfContent: ", extractedText);
    };

    reader.readAsArrayBuffer(file);
  };
  function generateQuestions() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt,
      questions,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_FLASK_URL}/${withPrompt ? "prompt" : "context"}`,
      requestOptions
    )
      .then(async (response) => response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          let createdQuestions=result.map((question)=>({question}))
          setDesQuestions([...createdQuestions,...desQuestions]);
          setLoading(false);
          setErrorMessage("");
          setPrompt("");
          setQuestions(0);
          if(currentTest._id){
            setChanged(true);
          }
        } else {
          setErrorMessage(
            JSON.stringify(result) ? JSON.stringify(result) : result.toString()
          );
          setLoading(false);
          console.log("result error: ", result);
        }
      })
      .catch((error) => {
        setErrorMessage(JSON.stringify(error)?JSON.stringify(error):error.toString());
        // setErrorMessage(error.toString()?error.toString():JSON.stringify(error));
        setLoading(false);
        console.log("error from catch: ", error);
      });
  }
  return (
    <div>
      {/* Modal start*/}
      <div
        id="questionpoolmodal"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow flex flex-col space-y-8 px-8 py-5">
            <div className="flex items-center justify-between rounded-t ">
              <h3 className="text-xl font-semibold text-spurple-300 dark:text-white">
                Generate questions with AI
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="questionpoolmodal"
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
            <div className="flex justify-start">
              <button
                onClick={() => setWithPrompt(!withPrompt)}
                className={
                  "rounded-l-lg px-5 py-2 border border-spurple-300 text-md font-medium " +
                  (!withPrompt
                    ? "text-spurple-300"
                    : "bg-spurple-300 text-swhite")
                }
              >
                Generate with simple prompt
              </button>
              <button
                onClick={() => setWithPrompt(!withPrompt)}
                className={
                  "rounded-r-lg px-5 py-2 border border-spurple-300 text-md font-medium " +
                  (!withPrompt
                    ? "bg-spurple-300 text-swhite"
                    : "text-spurple-300")
                }
              >
                Generate from text or uploaded content
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder={
                  withPrompt
                    ? "Enter prompt about questions"
                    : "Enter content for questions here"
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                accept=".txt,.docx,.doc,.pdf"
                className="border border-sgray-300 text-spurple-300 w-full rounded-lg"
              />
              <span
                className={
                  withPrompt
                    ? "hidden"
                    : "text-lg text-sgray-300 font-medium text-center"
                }
              >
                OR
              </span>
              <div
                className={
                  withPrompt
                    ? "hidden"
                    : "flex items-center justify-center w-full"
                }
              >
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PDF, DOC, DOCX or TEXT
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              {/* <div className="flex justify-start space-x-5 items-center">
                <span className="text-md text-sgray-300">Number of MCQs</span>
                <input
                  type="number"
                  value={mcqs}
                  onChange={(e) => setMcqs(e.target.value)}
                  min={0}
                  class="border border-spurple-300 text-spurple-300 text-sm rounded-lg block w-24 p-2"
                  placeholder="5"
                />
              </div> */}
              <div className="flex justify-start space-x-5 items-center">
                <span className="text-md text-sgray-300">
                  Number of questions
                </span>
                <input
                  type="number"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  min={0}
                  class="border border-spurple-300 text-spurple-300 text-sm rounded-lg block w-24 p-2"
                  placeholder="5"
                />
              </div>
            </div>
            <button
              onClick={generateQuestions}
              className="rounded-xl bg-spurple-300 text-swhite text-lg font-medium px-5 py-2 w-full"
            >
              <div className={loading ? "flex text-center items-center justify-center" : "hidden"}>
                <Loadingicon />
                <span>Generating...</span>
              </div>
              <span className={loading ? "hidden" : ""}>
                Generate Questions
              </span>
            </button>
            <Message
              type={errorMessage ? "Error" : ""}
              message={errorMessage}
            />
          </div>
        </div>
      </div>
      {/* Modal end */}
    </div>
  );
}
