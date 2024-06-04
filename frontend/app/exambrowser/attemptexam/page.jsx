"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import ExamNavbar from "@/app/components/ExamNavbar";
import ExamQuestion from "@/app/components/ExamQuestion";
import Message from "@/app/components/Message";
import { ResponseContext } from "@/app/context/ResponseState";
import { AnswersContext } from "@/app/context/AnwersState";
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentResponse, setCurrentResponse } = useContext(ResponseContext);
  const { answers, setAnswers } = useContext(AnswersContext);
  const [divClass, setDivClass] = useState(
    "unselectable bg-white h-screen hidden"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState(false);
  const [windowOpened, setWindowOpened] = useState(false);
  const [fetchedTest, setFetchedTest] = useState({});
  const [responses, setResponses] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const submitResponse = () => {
    console.log("responses: ", responses);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      attempterid: currentResponse.attempterId,
      testid: fetchedTest._id,
      responses,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/response`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        closeFullscreen();
        if (result._id) {
          setAnswers(
            result.responses.map((res) => {
              return {
                question: {
                  question: res.questionid.question,
                  options: res.questionid.options,
                },
                response: res.response,
              };
            })
          );
          router.push("/exambrowser/attemptexam/evaluation");
        } else if (result.message) {
          setMessageType(false);
          setErrorMessage(result.message);
        } else {
          console.log("result with error: ", result)
          setMessageType(false);
          setErrorMessage(JSON.stringify(result));
        }
      })
      .catch((error) => {
        console.log("error: ",error)
        setMessageType(false);
        setErrorMessage(JSON.stringify(error));
      });
  };

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  const enterFullscreen = () => {
    // console.log("fetchedTest: ",fetchedTest);
    // console.log("time: ",fetchedTest.time*60)
    // console.log("time remaining: ",timeRemaining);
    // const timeCounter=setInterval(() => {
    //   if(timeRemaining<=0){
    //     clearInterval(timeCounter);
    //     setDivClass("unselectable bg-white h-screen hidden");
    //   }
    //   setTimeRemaining(timeRemaining-1);
    // }, 1000);
    const elem = document.getElementById("testscreen");
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", function (e) {
      if (document.fullscreenElement) {
        // fullscreen mode activated
        setDivClass("unselectable bg-white h-screen");
      } else {
        // fullscreen mode deactivated
        setDivClass("unselectable bg-white h-screen hidden");
        // setTimeRemaining(0);
        // clearInterval(timeCounter);
        // if (!windowOpened) {
        //   window.close();
        //   router.push("/");
        //   setWindowOpened(true);
        // }
      }
    });
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${currentResponse.key}`,
      requestOptions
    )
      .then(async (response) => await response.json())
      .then((result) => {
        if (result._id) {
          setFetchedTest(result);
          // setTimeRemaining(result.time*60);
        } else {
          setMessageType(false);
          setErrorMessage(JSON.stringify(result));
        }
      })
      .catch((error) => {
        setMessageType(false);
        setErrorMessage(JSON.stringify(error));
        console.log("error from catch: ", error);
      });
  }, [searchParams, router, windowOpened, setFetchedTest, currentResponse]);
  return (
    <div>
      <ExamNavbar />
      <div className={errorMessage ? "mt-24 mb-5" : "hidden"}>
        <Message
          type={messageType ? "Success" : "Error"}
          message={errorMessage}
        />
      </div>
      <div className={errorMessage ? "hidden" : "mt-28"} />
      <div className="mx-10">
        <h2 className="mb-2 text-lg font-semibold text-spurple-300">
          Exam instructions:
        </h2>
        <ul className="w-full space-y-1 text-sgray-300 list-disc list-inside">
          <li>
            Once you start the exam, you cannot close it without submitting it.
          </li>
          <li>
            When you start exam, you will enter full-screen mode. If you escape
            this mode your exam will be automatically submitted.
          </li>
          <li>You can select, copy or cut any text in the exam.</li>
          <li>You cannot paste anything in any textfield.</li>
          <li>
            You can not re-attempt previous question once you click next button.
          </li>
          {fetchedTest.instructions?.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
        <h2 className="mt-5 text-lg font-semibold text-spurple-300">
          Best of luck !
        </h2>
        <button
          onClick={enterFullscreen}
          className="mt-5 bg-spurple-300 focus:bg-spurple-300 hover:bg-spurple-300 py-2 text-white rounded-lg px-8 text-lg font-semibold"
        >
          Start
        </button>
      </div>
      <div id="testscreen">
        <div
          className={divClass}
          //  style={{overflow:"scroll"}}
        >
          <ExamNavbar submitResponse={submitResponse} />
          <div className="overflow-auto">
            {fetchedTest.questions?.length > 0 ? (
              <div className="mt-28">
                <ExamQuestion
                  questions={fetchedTest.questions}
                  responses={responses}
                  setResponses={setResponses}
                />
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
