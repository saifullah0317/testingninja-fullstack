import React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Unauthorizederror({ message, setMessage }) {
  const modalRef = useRef();
  const router = useRouter();
  const [modalElement, setModalElement] = useState(modalRef.current);

  useEffect(() => {
    setModalElement(modalRef.current);
    setTimeout(() => {
      if (message) {
        console.log("message: ",message);
        console.log("modalElement: ", modalElement);
        modalElement.click();
      }
    }, 100);
    // Perform any actions you need with the DOM element

    // return () => {
    // Cleanup or perform actions when the component unmounts
    // };
  }, [modalElement, setModalElement, modalRef, message]);
  return (
    <>
      <button
        ref={modalRef}
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        type="button"
      ></button>

      <div
        id="popup-modal"
        tabindex="-1"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <button
              type="button"
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                class="w-3 h-3"
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
              <span class="sr-only">Close modal</span>
            </button> */}
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => {
                  console.log("before router: ",message);
                  router.push("/login?first=false");
                  setMessage("");
                  console.log("after router: ",message);
                }}
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
