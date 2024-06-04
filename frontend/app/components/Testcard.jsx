import React, { useContext } from "react";
import { convertDateFormat } from "../Helper";
import Link from "next/link";
import LinkIcon from "./LinkIcon";
import { TestContext } from "../context/TestState";
export default function Testcard({test}) {
  const { currentTest, setCurrentTest } = useContext(TestContext);
  let status=test.active  
  let date=test.createdAt
  let title=test.title
  let description=test.description
  let numberOfQuestions=test.questions.length
  let numberOfResponses=0
  let category=test.categoryid.category
  let key=test.key
  return (
    <>
      <div className="bg-swhite hover:shadow-lg px-5 py-5 rounded-lg">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start space-x-5">
              <div
                className={
                  "flex flex-row items-center rounded-lg px-2 py-1 w-fit border " +
                  (status ? "border-spurple-300" : "border-sgray-300")
                }
              >
                <div
                  className={
                    "h-2 w-2 rounded-full " +
                    (status ? "bg-sgreen" : "bg-sgray-300")
                  }
                />
                <span
                  className={
                    "ml-2 text-md " +
                    (status ? "text-spurple-300" : "text-sgray-300") +
                    " font-medium"
                  }
                >
                  {status ? "Active" : "Inactive"}
                </span>
              </div>
              <span className="text-md text-sgray-300 font-medium">
                Created: {convertDateFormat(date)}
              </span>
            </div>
            <Link href="/dashboard/generatetest">
              <button
                onClick={() => {
                  setCurrentTest(test);
                }}
              >
                <LinkIcon />
              </button>
            </Link>
          </div>
          <span className="text-xl font-bold text-spurple-300">{title}</span>
          <span className="text-lg text-sgray-300 font-normal">
            {description ? description : `(no description)`}
          </span>
          <div className="flex lg:flex-row md:flex-row flex-col justify-between lg:items-center md:items-center lg:space-y-0 md:space-y-0 space-y-2">
            <div className="flex items-center text-md">
              {/* <span className="ml-2 mr-2 text-spurple-300 font-bold">
                {avgScore + `%`}
              </span> */}
              <span className="text-sgray-300 mr-2">
                Test key: {key} |
              </span>
              <span className="text-sgray-300">
              {'('+numberOfQuestions+')'} Questions
              </span>
            </div>
            <div className="text-sgray-300 border border-sgray-300 p-2 rounded-lg w-fit">
              {category}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
