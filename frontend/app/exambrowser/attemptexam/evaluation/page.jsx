"use client";
import { useState, useEffect, useContext } from "react";
import Navbar from "@/app/components/Navbar";
import Message from "@/app/components/Message";
import Loader from "@/app/components/Loader";
import { AnswersContext } from "@/app/context/AnwersState";
export default function Page() {
  const { answers, setAnswers } = useContext(AnswersContext);
  const [loading, setLoading] = useState(true);
  const [scoreResult, setScoreResult] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(true);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      // responses: [
      //   {
      //     question: {
      //       question: "Name all the pillars of oop",
      //       options: [],
      //     },
      //     response: "encapsulation, inheritance",
      //   },
      //   {
      //     question: {
      //       question: "What does DSA stand for?",
      //       options: [
      //         "Data Suit and Algorithms",
      //         "Data Structures and Algorithms",
      //       ],
      //     },
      //     response: "Data Suit and Algorithms",
      //   },
      // ],
      responses: answers,
    });
    console.log("body for evaluation: ", raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/evaluation`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setLoading(false);
          console.log("result: ", result);
          setScoreResult(result);
        } else if (result.message) {
          console.log("reslt with error: ",result);
          setLoading(false);
          setMessageType(false);
          setMessage(result.message);
        } else {
          console.log("reslt with error: ",result);
          setLoading(false);
          setMessageType(false);
          setMessage(
            `An error occured while evaluating your response. ${String(result)}`
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        setMessageType(false);
        setMessage(
          `An error occured while evaluating your response. ${String(error)}`
        );
      });
  }, [setLoading, setScoreResult, setMessage, setMessageType, answers]);
  return (
    <div>
      <Navbar selectedRoute="exambrowser" bg="bg-swhite shadow-2xl" />
      <div className="mt-32  mb-5" />
      <div className={message ? "" : "hidden"}>
        <Message type={messageType ? "Success" : "Error"} message={message} />
      </div>
      <div>
        {loading ? (
          <Loader text="Evaluating your response. Please wait..." />
        ) : (
          scoreResult.length > 0 && (
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right">
                <thead class="text-xs text-swhite uppercase bg-spurple-300">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Question
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Your answer
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Score percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreResult.map((singleResult, index) => (
                    <tr key={index} className="bg-spurple-100 text-spurple-300 border-b border-spurple-300">
                      <td className="px-6 py-4">
                        {singleResult.question.slice(0, 40)}...
                      </td>
                      <td className="px-6 py-4">
                        {singleResult.response.slice(0, 40)}...
                      </td>
                      <td className="px-6 py-4">{singleResult.score}%</td>
                    </tr>
                  ))}
                  {/* <tr class="bg-white border-b">
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                </tr>
                <tr class="bg-white border-b">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td class="px-6 py-4">White</td>
                  <td class="px-6 py-4">Laptop PC</td>
                  <td class="px-6 py-4">$1999</td>
                </tr>
                <tr class="bg-white">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Magic Mouse 2
                  </th>
                  <td class="px-6 py-4">Black</td>
                  <td class="px-6 py-4">Accessories</td>
                  <td class="px-6 py-4">$99</td>
                </tr> */}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
