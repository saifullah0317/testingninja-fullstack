import React from "react";
import { useState, useRef } from "react";
import Loadingicon from "./Loadingicon";
import Message from "./Message";
import Unauthorizederror from "./Unauthorizederror";
export default function DefaultModal() {
  const modalRef = useRef();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType,setMessageType]=useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  function postCategory() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      category,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if (result._id) {
          setMessageType("Success");
          setErrorMessage(`Category ${category} saved successfully.`);
          setTimeout(() => {
            setCategory("");
            setMessageType("");
            setErrorMessage("");
            modalRef.current.click();
          }, 1500);
        } else if (result.status == 401 || result.statusCode == 401) {
          modalRef.current.click();
          setModalMessage("Authorization error ! Login again.");
        } else if (result.message) {
          setMessageType("Error");
          setErrorMessage(result.message);
        } else if (result.code) {
          if (result.code === 11000) {
            setMessageType("Error");
            setErrorMessage("Category already exist !");
          } else {
            setMessageType("Error");
            setErrorMessage(JSON.stringify(result));
          }
        } else {
          setMessageType("Error");
          setErrorMessage(result.toString());
        }
        setLoading(false);
      })
      .catch((error) => {
        setMessageType("Error");
        setErrorMessage(error.toString());
        setLoading(false);
      });
  }
  return (
    <div>
      {/* Modal start*/}
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
              <h3 className="text-xl font-semibold text-spurple-300 dark:text-white">
                Create new category
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-hide="default-modal"
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
            <div className="px-4">
              <input
                type="text"
                placeholder="Category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg w-full"
              />
            </div>

            <div className="flex justify-end space-x-5 items-center p-4 md:p-5 rounded-b">
              <button
                onClick={postCategory}
                className="text-swhite bg-spurple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? (
                  <div className="flex">
                    <Loadingicon />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <span>Create</span>
                )}
                <span></span>
              </button>
              <button
                ref={modalRef}
                data-modal-hide="default-modal"
                className="ms-3 text-sgray-300 bg-white rounded-lg border border-sgray-300 text-sm font-medium px-5 py-2.5"
              >
                Cancel
              </button>
            </div>
            <Unauthorizederror
              message={modalMessage}
              setMessage={setModalMessage}
            />
            <Message
              type={messageType}
              message={errorMessage}
            />
          </div>
        </div>
      </div>
      {/* Modal end */}
    </div>
  );
}
