import React from "react";

export default function Questionpoolcard({
  title,
  prompt,
  numOfQuestions,
  numOfTests
}) {
  return (
    <>
      <div className="bg-swhite hover:shadow-lg px-5 py-5 rounded-lg">
        <div className="flex flex-col space-y-5">
          <span className="text-xl font-bold text-spurple-300">{title}</span>
          <span className="text-lg text-sgray-300 font-normal">
            {prompt}
          </span>
          <span className="text-sgray-300 text-md">Questions ({numOfQuestions}) | {(numOfTests>0?`Used in ${numOfTests} tests`:'Not used in any test')}</span>
        </div>
      </div>
    </>
  );
}
