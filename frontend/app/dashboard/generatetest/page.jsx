"use client";
import React, { useEffect, useContext } from "react";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DefaultModal from "@/app/components/DefaultModal";
import CustomQuestionModal from "@/app/components/CustomQuestionModal";
import CustomMcqModal from "@/app/components/CustomMcqModal";
import QuestionPoolModal from "@/app/components/QuestionPoolModal";
import Message from "@/app/components/Message";
import Unauthorizederror from "@/app/components/Unauthorizederror";
import Deleteicon from "@/app/components/Deleteicon";
import { TestContext } from "@/app/context/TestState";
import Loadingicon from "@/app/components/Loadingicon";
import { convertEmails } from "@/app/Helper";
import TimePicker from "@/app/components/TimePicker";
import { QuestionsContext } from "@/app/context/QuestionsState";
import { McqsContext } from "@/app/context/McqsState";
// import { set, setHours } from "date-fns";
// import Datepicker from "@/app/components/Datepicker";
// import { set } from "date-fns";
export default function Generatetest() {
  const router = useRouter();
  const { desQuestions, setDesQuestions } = useContext(QuestionsContext);
  const { mcqs, setMcqs } = useContext(McqsContext);
  const { currentTest, setCurrentTest } = useContext(TestContext);
  const [postTest, setPostTest] = useState(
    currentTest._id ? currentTest.isPost : true
  );
  const [allowAttemption, setAllowAttemption] = useState(
    currentTest._id && currentTest.isPost ? currentTest.allowAll : false
  );
  const [activateTest, setActivateTest] = useState(
    currentTest.isPost ? currentTest.active : true
  );
  const [activateButtonText, setActivateButtonText] = useState(
    currentTest.active ? "Deactivate" : "Activate"
  );

  // const [deactivateTest, setDeactivateTest] = useState(true);
  // const [activationDate, setActivationDate] = useState();
  // const [deactivationDate, setDeactivationDate] = useState();
  // const [activationTime, setActivationTime] = useState();
  // const [deactivationTime, setDeactivationTime] = useState();

  const [modalMessage, setModalMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(
    currentTest._id ? currentTest.categoryid.category : "Uncategorized"
  );
  const [testTitle, setTestTitle] = useState(
    currentTest._id ? currentTest.title : ""
  );
  const [description, setDescription] = useState(
    currentTest._id ? currentTest.description : ""
  );
  const [respondentlists, setRespondentlists] = useState([]);
  const [selectedRespondentlists, setSelectedRespondentlists] = useState(
    currentTest.isPost && !currentTest.allowAll
      ? currentTest.attempterListid
      : []
  );
  const [respondentlistDropdown, setRespondentlistDropdown] = useState(false);
  const [customQuestionDropdown, setCustomQuestionDropdown] = useState(false);
  // const [testDuration, setTestDuration] = useState();
  const [selectedHour, setSelectedHour] = useState(
    currentTest._id && currentTest.isPost ? currentTest.time / 60 : undefined
  );
  const [selectedMinute, setSelectedMinute] = useState(
    currentTest._id && currentTest.isPost ? currentTest.time % 60 : undefined
  );
  const [sendTestKey, setSendTestKey] = useState(true);
  const [sendTestKeyButtonText, setSendTestKeyButtonText] =
    useState("Send mails");
  const initialInstructions = [
    "Once you start the exam, you cannot close it without submitting it.",
    "When you start exam, you will enter full-screen mode. If you escape this mode your exam will be automatically submitted.",
    "You cannot select, copy or cut any text in the exam.",
    "You cannot paste anything in any textfield.",
    "You can not re-attempt previous question once you click next button."
  ];
  const [testInstructions, setTestInstructions] = useState(
    currentTest.isPost ? currentTest.instructions : []
  );
  const [singleInstruction, setSingleInstruction] = useState("");
  function calculateTotalMinutes() {
    return Number(selectedHour) * 60 + Number(selectedMinute);
  }
  function checkRequiredInputs() {
    if (
      testTitle &&
      categorySelected &&
      desQuestions.length + mcqs.length > 0
    ) {
      if (postTest) {
        if (selectedHour && selectedMinute) {
          if ((!allowAttemption && respondentlists) || allowAttemption) {
            return true;
          } else {
            setErrorMessage("Please select atleast one respondent list.");
          }
        } else {
          setErrorMessage("Test duration is required.");
        }
      } else {
        return true;
      }
    } else {
      setErrorMessage(
        "Either test title, category or question to add is missing. Kindly fill all of them."
      );
    }
    return false;
  }
  function undoChanges() {
    setTestTitle(currentTest.title);
    setDescription(currentTest.description);
    setCategorySelected(currentTest.categoryid.category);
    let desQuestionsTemp = [],
      mcqsTemp = [];
    for (let i = 0; i < currentTest.questions.length; i++) {
      let { _id, _v, ...tempQuestion } = currentTest.questions[i];
      if (currentTest.questions[i].options.length > 1) {
        mcqsTemp.push(tempQuestion);
      } else {
        desQuestionsTemp.push(tempQuestion);
      }
    }
    setDesQuestions(desQuestionsTemp);
    setMcqs(mcqsTemp);
    setPostTest(currentTest.isPost);
    setSelectedHour(currentTest.time / 60);
    setSelectedMinute(currentTest.time % 60);
    setAllowAttemption(currentTest.allowAll);
    setSelectedRespondentlists(currentTest.attempterListid);
    setActivateTest(currentTest.active);
    setActivateButtonText(currentTest.active ? "Deactivate" : "Activate");
    setTestInstructions(currentTest.instructions);
    setChanged(false);
  }
  async function saveChanges() {
    setLoading(true);
    if (checkRequiredInputs()) {
      postQuestions(desQuestions, mcqs).then((postedQuestions) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let categoryid = categories.find(
          (cat) => cat.category == categorySelected
        )._id;
        const raw = JSON.stringify({
          title: testTitle,
          description,
          categoryid,
          questions: postedQuestions,
          isPost: postTest,
          time: calculateTotalMinutes(),
          allowAll: allowAttemption,
          attempterListid: selectedRespondentlists.map(
            (respondentlist) => respondentlist._id
          ),
          active: activateTest,
          testInstructions,
        });
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
          credentials: "include",
        };

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${currentTest._id}`, requestOptions)
          .then(async (response) => await response.json())
          .then((result) => {
            if (result._id) {
              setErrorMessage("");
              setSuccessMessage(
                `Changes of test "${result.title}" saved sucessfully!`
              );
              setTimeout(() => {
                router.push("/dashboard/mytests");
              }, 2000);
            } else if (result.status == 401 || result.statusCode == 401) {
              // setModalMessage("Authorization error ! Login again.")
              setErrorMessage("Authorization error ! Login again.");
            } else {
              setErrorMessage(result.message || result.toString());
            }
          })
          .catch((error) => {
            setErrorMessage(error.message || error.toString());
          });
      });
    }
    setLoading(false);
  }
  async function createTest() {
    setLoading(true);
    if (checkRequiredInputs()) {
      postQuestions(desQuestions, mcqs).then((postedQuestions) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let categoryid = categories.find(
          (cat) => cat.category == categorySelected
        )._id;
        const raw = JSON.stringify({
          title: testTitle,
          description,
          categoryid,
          questions: postedQuestions,
          isPost: postTest,
          time: calculateTotalMinutes(),
          allowAll: allowAttemption,
          attempterListid: selectedRespondentlists.map(
            (respondentlist) => respondentlist._id
          ),
          active: activateTest,
          testInstructions,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
          credentials: "include",
        };

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, requestOptions)
          .then(async (response) => await response.json())
          .then((result) => {
            if (result._id) {
              setCurrentTest(result);
              sendTestKeyFunction();
              setErrorMessage("");
              setSuccessMessage(
                `Test "${result.title}" saved sucessfully! Test key is ${result.key}`
              );
              // setTimeout(() => {
              //   router.push("/dashboard/mytests");
              // }, 2000);
            } else if (result.status == 401 || result.statusCode == 401) {
              // setModalMessage("Authorization error ! Login again.")
              setErrorMessage("Authorization error ! Login again.");
            } else {
              setErrorMessage(result.message || result.toString());
            }
          })
          .catch((error) => {
            setErrorMessage(error.message || error.toString());
          });
      });
    }
    setLoading(false);
  }
  async function deleteTest() {
    // const requestOptions = {
    //   method: "DELETE",
    //   redirect: "follow",
    //   credentials: "include",
    // };

    // fetch(`http://localhost:8080/test/${currentTest._id}`, requestOptions)
    //   .then(async (response) => await response.json())
    //   .then((result) => {
    //     if (result._id) {
    //       setErrorMessage("");
    //       setSuccessMessage(`Test "${result.title}" deleted sucessfully!`);
    //       setTimeout(() => {
    //         router.push("/dashboard/mytests");
    //       }, 2000);
    //     } else if (result.status == 401 || result.statusCode == 401) {
    //       // setModalMessage("Authorization error ! Login again.")
    //       setErrorMessage("Authorization error ! Login again.");
    //     } else {
    //       setErrorMessage(result.message || result.toString());
    //     }
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message || error.toString());
    //   });
  }
  function postQuestions(desQuestionsParam, mcqsParam) {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        questions: [...desQuestionsParam, ...mcqsParam],
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        credentials: "include",
      };
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/all`,
        requestOptions
      )
        .then(async (response) => {
          const result = await response.json();
          if (Array.isArray(result)) {
            const questionsIds = result.map((question) => question._id);
            console.log("questionsIds: ", questionsIds);
            resolve(questionsIds);
          } else if (result.status == 401 || result.statusCode == 401) {
            reject("Authorization error! Login again.");
          } else {
            reject(result.message || result.toString());
          }
        })
        .catch((error) => {
          reject(error.message || error.toString());
        });
    });
  }
  function sendTestKeyFunction() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      credentials:'include'
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/${currentTest._id}`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if(Array.isArray(result)){
          if(result.length==0){
          setSendTestKeyButtonText("Mails sent");
          }
          else{
            setErrorMessage(`Mail not sent to ${result.join(", ")}`);
          }
        }
        else if(result.status==401 || result.statusCode==401){
          setErrorMessage("Authorization error ! Login again.");
        }
        else{
          setErrorMessage(result.message || result.toString());
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || error.toString());
      });
  }
  // function postQuestions() {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const raw = JSON.stringify({
  //     questions: [...desQuestions, ...mcqs],
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //     credentials: "include",
  //   };

  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/all`, requestOptions)
  //     .then(async (response) => await response.json())
  //     .then((result) => {
  //       if (Array.isArray(result)) {
  //         // return result.map((question) => question._id);
  //         let questionsIds=result.map((question) => question._id);
  //         console.log("Questions ids: ", questionsIds);
  //         return Promise.resolve(questionsIds);
  //       } else if (result.status == 401 || result.statusCode == 401) {
  //         // setModalMessage("Authorization error ! Login again.")
  //         setErrorMessage("Authorization error ! Login again.");
  //       } else {
  //         setErrorMessage(result.message || result.toString());
  //       }
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message || error.toString());
  //     });
  // }
  useEffect(() => {
    if (currentTest._id) {
      console.log("selected: ",selectedRespondentlists);
      let desQuestionsTemp = [],
        mcqsTemp = [];
      for (let i = 0; i < currentTest.questions.length; i++) {
        let { _id, _v, ...tempQuestion } = currentTest.questions[i];
        if (currentTest.questions[i].options) {
          mcqsTemp.push(tempQuestion);
        } else {
          desQuestionsTemp.push(tempQuestion);
        }
      }
      setDesQuestions(desQuestionsTemp);
      setMcqs(mcqsTemp);
    }
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, requestOptions)
      .then(async (response) => await response.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setCategories(result);
        } else if (result.status == 401 || result.statusCode == 401) {
          // setModalMessage("Authorization error ! Login again.")
          setErrorMessage("Authorization error ! Login again.");
        } else if (result.code) {
          setErrorMessage(JSON.stringify(result));
        } else if (result.message) {
          setErrorMessage(result.message);
        } else {
          setErrorMessage(result.toString());
        }
      })
      .catch((error) => {
        setErrorMessage(error.toString());
      });

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/attempterlist`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        if (Array.isArray(data)) {
          setRespondentlists(data);
        } else if (data.message && !errorMessage) {
          setErrorMessage(data.message);
        } else if (data.code && !errorMessage) {
          setErrorMessage(JSON.stringify(data));
        } else if (!errorMessage) {
          setErrorMessage(data.toString());
        }
      })
      .catch((error) => {
        // if (!errorMessage) {
          setErrorMessage(error.toString());
        // }
      });
  }, [
    setCategories,
    setModalMessage,
    setErrorMessage,
    router,
    setRespondentlists,
    errorMessage,
    currentTest,
    setDesQuestions,
    setMcqs,
    selectedRespondentlists
  ]);
  return (
    <>
      {/* <ErrorModal className={modalMessage?"":'hidden'}/> */}
      <DefaultModal />
      <CustomMcqModal
        mcqs={mcqs}
        setMcqs={setMcqs}
        currentTest={currentTest}
        setChanged={setChanged}
      />
      <CustomQuestionModal
        desQuestions={desQuestions}
        setDesQuestions={setDesQuestions}
        currentTest={currentTest}
        setChanged={setChanged}
      />
      <QuestionPoolModal
        desQuestions={desQuestions}
        setDesQuestions={setDesQuestions}
        currentTest={currentTest}
        setChanged={setChanged}
      />
      <Unauthorizederror message={modalMessage} setMessage={setModalMessage} />
      <div className="flex flex-col space-y-5 -mt-12">
        <div className="mt-4">
          <Message type={errorMessage ? "Error" : ""} message={errorMessage} />
          <Message
            type={successMessage ? "Success" : ""}
            message={successMessage}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium text-spurple-300 flex justify-start space-x-3 items-center">
            <Link href="/dashboard/mytests">
              <img
                width="15"
                height="15"
                src="https://img.icons8.com/510173/ios-filled/50/back.png"
                alt="back"
              />
            </Link>
            <span>{!currentTest._id ? "New" : "Edit"} Test</span>
          </div>
          <div className="flex items-center justify-end space-x-5">
            <button
              disabled={currentTest._id && !changed}
              className={
                (!currentTest._id ? "hidden" : "") +
                " px-5 py-2 rounded-lg text-md font-medium " +
                (currentTest._id && !changed
                  ? "bg-sgray-200 text-sgray-300"
                  : "bg-spurple-300 text-swhite")
              }
              onClick={() => {
                undoChanges();
              }}
            >
              Undo changes
            </button>
            <button
              disabled={currentTest._id && !changed}
              // className="px-5 py-2 rounded-lg bg-spurple-300 text-swhite text-md font-medium"
              className={
                "px-5 py-2 rounded-lg text-md font-medium " +
                (currentTest._id && !changed
                  ? "bg-sgray-200 text-sgray-300"
                  : "bg-spurple-300 text-swhite")
              }
              onClick={() => {
                if (!currentTest._id) {
                  if (true) {
                    // if (listname && emails) {
                    createTest();
                  } else {
                    setErrorMessage(
                      "Please fill all the required input fields."
                    );
                  }
                } else {
                  saveChanges();
                }
              }}
            >
              <div className={loading ? "flex" : "hidden"}>
                <Loadingicon />
                <span>Saving...</span>
              </div>
              <span className={!currentTest._id && !loading ? "" : "hidden"}>
                Save test
              </span>
              <span className={!currentTest._id && !loading ? "hidden" : ""}>
                Save changes
              </span>
            </button>
            <button
              className={!currentTest._id ? "hidden" : ""}
              onClick={() => {
                deleteTest();
              }}
            >
              <Deleteicon size={40} hover={true} />
            </button>
          </div>
        </div>
        {/* basic settings */}
        <div>
          <div className="bg-swhite rounded-lg p-5 w-full space-y-5">
            <span className="text-md font-medium text-spurple-300">
              BASIC SETTINGS
            </span>
            <div>
              <input
                type="text"
                id="testtitle"
                placeholder="Test title"
                value={testTitle}
                onChange={(e) => {
                  if (currentTest._id) {
                    setChanged(true);
                  }
                  setTestTitle(e.target.value);
                }}
                className="w-full rounded-lg text-spurple-300"
              />
            </div>
            <div>
              <input
                type="text"
                id="testdescription"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => {
                  if (currentTest._id) {
                    setChanged(true);
                  }
                  setDescription(e.target.value);
                }}
                className="w-full rounded-lg text-spurple-300"
              />
            </div>
            <div className="space-y-3">
              <span className="text-md text-sgray-300">Choose category</span>
              <div className="flex justify-between items-start space-x-5">
                <div className="w-full flex flex-col">
                  <select
                    id="countries"
                    value={categorySelected}
                    onChange={(e) => {
                      if (currentTest._id) {
                        setChanged(true);
                      }
                      setCategorySelected(e.target.value);
                    }}
                    className="text-spurple-300 border-spurple-300 text-md rounded-lg px-5 py-2"
                  >
                    {categories.map((category, index) => (
                      <option value={category.category} key={index}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-sgray-300">{`When you have a larger number of tests, assign them to specific categories, e.g. "Recruitment tests", etc. Using the category you'll be able to use filtering options in the My tests tab.`}</span>
                </div>
                <button
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  className="text-swhite bg-spurple-300 font-medium rounded-lg text-md px-5 py-2 text-center w-52"
                >
                  Create category
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Questions management */}
        <div>
          <div className="bg-swhite rounded-lg p-5 w-full flex flex-col space-y-5">
            <span className="text-md font-medium text-spurple-300">
              QUESTIONS MANAGEMENT
            </span>
            <div className="flex justify-between items-center">
              <span className="text-sgray-300 text-md">
                {mcqs.length + desQuestions.length > 0
                  ? `(${
                      mcqs.length + desQuestions.length
                    }) questions added to the test.`
                  : "Add questions to the test"}
              </span>
              <div className="flex justify-end space-x-5">
                <div>
                  <button
                    className="text-spurple-300 border border-spurple-300 bg-transparent font-medium rounded-lg text-md px-5 py-2 text-center inline-flex items-center"
                    onClick={() =>
                      setCustomQuestionDropdown(!customQuestionDropdown)
                    }
                  >
                    Add custom question{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={
                      customQuestionDropdown
                        ? "bg-swhite border border-spurple-100 divide-y divide-gray-100 rounded-lg shadow-lg w-44 absolute m-2"
                        : "hidden"
                    }
                  >
                    <ul className="py-2 text-sm text-spurple-300">
                      <li>
                        <button
                          data-modal-target="modal2"
                          data-modal-toggle="modal2"
                          className="text-spurple-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                          Multiple Choice
                        </button>
                      </li>

                      <li>
                        <button
                          data-modal-target="modal1"
                          data-modal-toggle="modal1"
                          className="text-spurple-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                        >
                          Descriptive
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  data-modal-target="questionpoolmodal"
                  data-modal-toggle="questionpoolmodal"
                  className="bg-spurple-300 font-medium text-swhite px-5 py-2 rounded-lg"
                >
                  Generate with AI
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-5 mt-10">
              {desQuestions.map((desQuestion, index) => (
                <div
                  key={index}
                  className="bg-spurple-100 rounded-lg p-2 text-spurple-300 text-lg flex justify-between items-start"
                >
                  <span>
                    Question {index + 1 + ": " + desQuestion.question}
                  </span>
                  <button
                    onClick={() => {
                      if (currentTest._id) {
                        setChanged(true);
                      }
                      setDesQuestions((currentQuestions) =>
                        currentQuestions.filter((tempQuestion, i) => i != index)
                      );
                    }}
                  >
                    <Deleteicon hover={true} size={35} />
                  </button>
                </div>
              ))}
              {mcqs.map((mcq, index) => (
                <div
                  key={index}
                  className="bg-spurple-100 rounded-lg p-2 flex justify-between items-start"
                >
                  <div className="flex flex-col space-y-2">
                    <span className="text-spurple-300 text-lg">
                      Question{" "}
                      {index + 1 + desQuestions.length + ": " + mcq.question}
                    </span>
                    {mcq.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex flex-row items-center justify-start space-x-5 text-lg"
                      >
                        <input
                          type="radio"
                          name="answer"
                          id={"answer" + index}
                          value={option}
                          className="w-4 h-4"
                        />
                        <label
                          for={"answer" + index}
                          className="text-spurple-300"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (currentTest._id) {
                        setChanged(true);
                      }
                      setMcqs((currentQuestions) =>
                        currentQuestions.filter((tempQuestion, i) => i != index)
                      );
                    }}
                  >
                    <Deleteicon hover={true} size={35} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div>
          <div className="bg-swhite rounded-lg p-5 w-full flex flex-col space-y-8">
            <span className="text-md font-medium text-spurple-300">
              EXAM BROWSER CONFIGURATION
            </span>
            {/* <div className="flex justify-start space-x-5">
              <span className="text-spurple-300">
                Post this test on Safe Exam Browser ?
              </span>
              <label className="relative inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={postTest}
                  onChange={() => setPostTest(!postTest)}
                />
                <div className="w-11 h-6 bg-sgray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-spurple-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-swhite after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-swhite after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-spurple-300"></div>
                <span className="ms-3 text-md text-spurple-300 font-medium">
                  {postTest ? "Yes" : "No"}
                </span>
              </label>
            </div> */}
            <div className="flex">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-spurple-300 border-spurple-300 rounded"
                  checked={postTest}
                  onChange={() => {
                    if (currentTest._id) {
                      setChanged(true);
                    }
                    setPostTest(!postTest);
                  }}
                />
              </div>
              <div className="ms-2">
                <label className="text-md text-spurple-300 dark:text-gray-300">
                  Post this test on Safe Exam Browser ?
                </label>
              </div>
            </div>

            <div
              className={
                postTest
                  ? "flex justify-start space-x-5 items-center"
                  : "hidden"
              }
            >
              <span className="text-sgray-300">Test duration</span>
              {/* <TimePicker setTime={setTestDuration} /> */}

              <div className="flex flex-row items-center justify-start space-x-2">
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={selectedHour}
                  onChange={(e) => {
                    if (currentTest._id) {
                      setChanged(true);
                    }
                    setSelectedHour(e.target.value);
                  }}
                  placeholder="hours"
                  className="w-28 rounded-lg border border-swhite text-spurple-300"
                />
                <span>:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={selectedMinute}
                  onChange={(e) => {
                    if (currentTest._id) {
                      setChanged(true);
                    }
                    setSelectedMinute(e.target.value);
                  }}
                  placeholder="minutes"
                  className="w-28 rounded-lg border border-swhite text-spurple-300"
                />
              </div>
            </div>
            <div className={postTest ? "flex" : "hidden"}>
              <div className="flex items-center h-6">
                <input
                  id="allowAttemption"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-spurple-300 border-spurple-300 rounded"
                  checked={allowAttemption}
                  onChange={() => {
                    if (currentTest._id) {
                      setChanged(true);
                    }
                    setAllowAttemption(!allowAttemption);
                  }}
                />
              </div>
              <div className="ms-2">
                <label
                  htmlFor="allowAttemption"
                  className="text-md text-spurple-300 dark:text-gray-300"
                >
                  Allow everyone with the test-key to attemp the test
                </label>
                <p id="helper-checkbox-text" className="text-sm text-sgray-300">
                  {
                    "Recommended: Don't allow everyone, rather enter list of emails of those who you want to attempt the test"
                  }
                </p>
              </div>
            </div>
            <div
              className={
                postTest && !allowAttemption
                  ? "flex justify-start space-x-5"
                  : "hidden"
              }
            >
              <div className="w-full">
                <button
                  className="text-spurple-300 border border-spurple-300 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex w-full items-center justify-between"
                  onClick={() =>
                    setRespondentlistDropdown(!respondentlistDropdown)
                  }
                >
                  Select respondents lists{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  className={
                    respondentlistDropdown
                      ? "border border-spurple-100 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-1/2 m-3 p-5 absolute"
                      : "hidden"
                  }
                >
                  {respondentlists.length > 0 ? (
                    <ul
                      className="space-y-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownHelperButton"
                    >
                      {respondentlists.map((respondentlist, index) => (
                        <li key={index}>
                          <div className="flex rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex items-center h-5">
                              <input
                                // id={"attempters-checkbox-" + index}
                                id="helper-checkbox-1"
                                aria-describedby="helper-checkbox-text-1"
                                type="checkbox"
                                checked={selectedRespondentlists.includes(
                                  respondentlist
                                )}
                                onChange={() => {
                                  if (currentTest._id) {
                                    setChanged(true);
                                  }
                                  if (
                                    selectedRespondentlists.includes(
                                      respondentlist
                                    )
                                  ) {
                                    setSelectedRespondentlists(
                                      selectedRespondentlists.filter(
                                        (item) =>
                                          item._id !== respondentlist._id
                                      )
                                    );
                                  } else {
                                    setSelectedRespondentlists([
                                      ...selectedRespondentlists,
                                      respondentlist,
                                    ]);
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                            </div>
                            <div className="ms-2 text-sm">
                              <label
                                // htmlFor={"attempters-checkbox-" + index}
                                htmlFor="helper-checkbox-1"
                                className="font-medium text-gray-900 dark:text-gray-300"
                              >
                                <div>{respondentlist.title}</div>
                                <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                  {convertEmails(respondentlist.attempters, 70)}
                                </p>
                              </label>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sgray-300 text-md font-medium">
                      No list added yet,{" "}
                      <Link
                        href="/dashboard/respondents"
                        className="text-spurple-300 underline"
                      >
                        create list
                      </Link>{" "}
                      on respondents page.
                    </div>
                  )}
                </div>
              </div>
              <Link
                href="/dashboard/respondents"
                className="bg-spurple-300 px-5 py-2 text-swhite text-md rounded-lg w-64 font-medium"
              >
                Manage respondents
              </Link>
            </div>
            <div
              className={
                !currentTest._id && postTest && !allowAttemption
                  ? "flex"
                  : "hidden"
              }
            >
              <div className="flex items-center h-6">
                <input
                  id="sendTestKey"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-spurple-300 border-spurple-300 rounded"
                  checked={sendTestKey}
                  onChange={() => {
                    setSendTestKey(!sendTestKey);
                  }}
                />
              </div>
              <div className="ms-2">
                <label
                  htmlFor="sendTestKey"
                  className="text-md text-spurple-300 dark:text-gray-300"
                >
                  Send test keys to all selected attempters{"'"} emails
                </label>
                {/* <p id="helper-checkbox-text" className="text-sm text-sgray-300">
                  {
                    "Recommended: Don't allow everyone, rather enter list of emails of those who you want to attempt the test"
                  }
                </p> */}
              </div>
            </div>
            <div
              className={
                currentTest._id && postTest && !allowAttemption
                  ? "flex items-center justify-start space-x-5"
                  : "hidden"
              }
            >
              <span className="text-sgray-300">
                Send test key to attepters emails
              </span>
              <button
                className={"px-5 py-2 rounded-lg text-md font-medium "+(sendTestKeyButtonText=="Mails sent"?"bg-sgray-200 text-sgray-300":"bg-spurple-300 text-swhite w-fit")}
                onClick={sendTestKeyFunction}
                disabled={sendTestKeyButtonText=="Mails sent"?true:false}
              >
                {sendTestKeyButtonText}
              </button>
            </div>
            <div className={postTest && !currentTest._id ? "flex" : "hidden"}>
              <div className="flex items-center h-6">
                <input
                  id="activateTest"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-spurple-300 border-spurple-300 rounded"
                  checked={activateTest}
                  onChange={() => {
                    setActivateTest(!activateTest);
                  }}
                />
              </div>
              <div className="ms-2">
                <label
                  htmlFor="activateTest"
                  className="text-md text-spurple-300 dark:text-gray-300"
                >
                  Activate test on the time of creating.
                </label>
                <p id="helper-checkbox-text" className="text-sm text-sgray-300">
                  {`Otherwise you can activate anytime by clicking "Activate" button. An active state of test indicates that it's availabe to attempt for the respondents.`}
                </p>
              </div>
            </div>
            <div
              className={
                postTest && currentTest._id
                  ? "flex items-center justify-start space-x-5"
                  : "hidden"
              }
            >
              <span className="text-sgray-300">
                {currentTest.active ? "Deactivate" : "Activate"} this test now
              </span>
              <button
                className="px-5 py-2 rounded-lg text-md font-medium bg-spurple-300 text-swhite w-fit"
                onClick={() => {
                  setChanged(true);
                  setActivateTest(!currentTest.active);
                  setActivateButtonText(activateButtonText + "d !");
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 500);
                }}
              >
                {activateButtonText}
              </button>
            </div>
            {/* <div
              className={
                activateTest
                  ? "hidden"
                  : "flex justify-between items-center space-x-5"
              }
            >
              <div className="flex justify-start space-x-5 items-center">
                <span className="text-sgray-300">Test activation date</span>
                <Datepicker date={activationDate} setDate={setActivationDate} />
              </div>
              <div className="flex justify-end space-x-5 items-center">
                <span className="text-sgray-300">Test activation time</span>
                <TimePicker setTime={setActivationTime} />
              </div>
            </div>
            <div
              className={
                postTest && ((activationDate && activationTime) || activateTest)
                  ? "flex"
                  : "hidden"
              }
            >
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-spurple-300 border-spurple-300 rounded"
                  checked={deactivateTest}
                  onChange={() => setDeactivateTest(!deactivateTest)}
                />
              </div>
              <div className="ms-2">
                <label className="text-md text-spurple-300 dark:text-gray-300">
                  Specify deactivation date and time.
                </label>
                <p id="helper-checkbox-text" className="text-sm text-sgray-300">
                  {
                    "Otherwise you can also deactivate test manually on the test page anytime."
                  }
                </p>
              </div>
            </div>
            <div
              className={
                postTest &&
                deactivateTest &&
                ((activationDate && activationTime) || activateTest)
                  ? "flex justify-between items-center space-x-5"
                  : "hidden"
              }
            >
              <div className="flex justify-start space-x-5 items-center">
                <span className="text-sgray-300">Test deactivation date</span>
                <Datepicker
                  date={deactivationDate}
                  setDate={setDeactivationDate}
                />
              </div>
              <div className="flex justify-end space-x-5 items-center">
                <span className="text-sgray-300">Test deactivation time</span>
                <TimePicker setTime={setDeactivationTime} />
              </div>
            </div> */}

            <div className={postTest ? "flex flex-col space-y-5" : "hidden"}>
              <span className="text-md text-sgray-300">
                Add instruction that will appear to respondent before attempting
                exam (optional)
              </span>
              <div className="flex justify-start">
                <input
                  type="text"
                  value={singleInstruction}
                  onChange={(e) => setSingleInstruction(e.target.value)}
                  placeholder="Enter one instruction for attempter here"
                  className="w-full rounded-l-lg border border-sgray-300 text-spurple-300"
                />
                <button
                  onClick={() => {
                    if (currentTest._id) {
                      setChanged(true);
                    }
                    setTestInstructions([
                      ...testInstructions,
                      singleInstruction,
                    ]);
                    setSingleInstruction("");
                  }}
                  className="px-5 py-2 rounded-r-lg text-md font-medium bg-spurple-300 text-swhite"
                >
                  Add
                </button>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-spurple-300">
                  Exam instructions:
                </h2>
                <ul className="w-full space-y-1 text-spurple-300 list-disc list-inside">
                  {[...initialInstructions, ...testInstructions].map(
                    (instruction, index) => (
                      <li key={index}>{instruction}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
