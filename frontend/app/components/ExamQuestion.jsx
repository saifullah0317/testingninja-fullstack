import { useState, useEffect } from "react";
export default function ExamQuestion(props) {
  // const attempterid = props.attempter;
  const questions = JSON.parse(JSON.stringify(props.questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttonClass, setButtonClass] = useState(
    "absolute right-10 top-1/2 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-spurple-300 hover:text-spurple-300 focus:text-spurple-300 focus:outline-none focus:shadow-outline"
  );
  const [rows, setRows] = useState(12);
  const [optionSelected, setOptionSelected] = useState();
  const [textAreaValue, setTextAreaValue] = useState("");
  const handleTextAreaChange = (event) => {
    const textArea = event.target;
    const lineHeight = 20;
    const newRows = Math.max(Math.ceil(textArea.scrollHeight / lineHeight), 12);
    if (textArea.clientHeight < textArea.scrollHeight) {
      setRows(newRows);
    }
    setTextAreaValue(textArea.value);
  };
  const nextQuestion = () => {
    // questions[currentQuestionIndex]
    console.log("questions[currentQuestionIndex]: ",questions[currentQuestionIndex]);
    // let responseDocument = {
    //   questionid: questions[currentQuestionIndex]._id,
    //   attempterid: attempterid,
    // };
    // if (questions[currentQuestionIndex].type == "mcq") {
    //   responseDocument.response = optionSelected.toString();
    //   setOptionSelected(0);
    // } else {
    //   responseDocument.response = textAreaValue;
    //   setTextAreaValue("");
    //   setRows(12);
    // }
    // submitResponse(responseDocument);
    props.setResponses([...props.responses,{questionid:questions[currentQuestionIndex]._id, response:questions[currentQuestionIndex].options.length>0?questions[currentQuestionIndex].options[optionSelected]:textAreaValue}]);
    setOptionSelected(-1);
    setTextAreaValue("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setButtonClass("hidden");
    }
  };

  return (
    <div className="flex flex-col w-2/3 mx-auto text-lg mt-20 font-medium h-screen text-spurple-300">
      {'Question '+(currentQuestionIndex+1)+': '+questions[currentQuestionIndex].question}
      {questions[currentQuestionIndex].options.length > 0 && (
        <div className="flex flex-col mt-5">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div className="mb-2" key={index}>
              <input
                className="accent-[#510173] mr-3 w-4 h-4"
                type="radio"
                id={"option"+index}
                name="mcq"
                value={option}
                checked={optionSelected == index}
                onChange={() => {
                  setOptionSelected(index);
                }}
              />
              <label htmlFor={"option"+index}>
                {option}
              </label>
            </div>
          ))}
          {/* <div className="mb-2">
            <input
              className="accent-[#510173] mr-3 w-4 h-4"
              type="radio"
              id="option1"
              name="mcq"
              value={questions[currentQuestionIndex].option1}
              checked={optionSelected == 1}
              onChange={() => {
                setOptionSelected(1);
              }}
            />
            <label htmlFor="option1">
              {questions[currentQuestionIndex].option1}
            </label>
          </div>
          <div className="mb-2">
            <input
              className="accent-[#510173] mr-3 w-4 h-4"
              type="radio"
              id="option2"
              name="mcq"
              value={questions[currentQuestionIndex].option2}
              checked={optionSelected == 2}
              onChange={() => {
                setOptionSelected(2);
              }}
            />
            <label htmlFor="option2">
              {questions[currentQuestionIndex].option2}
            </label>
          </div>
          <div className="mb-2">
            <input
              className="accent-[#510173] mr-3 w-4 h-4"
              type="radio"
              id="option3"
              name="mcq"
              value={questions[currentQuestionIndex].option3}
              checked={optionSelected == 3}
              onChange={() => {
                setOptionSelected(3);
              }}
            />
            <label htmlFor="option3">
              {questions[currentQuestionIndex].option3}
            </label>
          </div>
          <div className="mb-2">
            <input
              className="accent-[#510173] mr-3 w-4 h-4"
              type="radio"
              id="option4"
              name="mcq"
              value={questions[currentQuestionIndex].option4}
              checked={optionSelected == 4}
              onChange={() => {
                setOptionSelected(4);
              }}
            />
            <label htmlFor="option4">
              {questions[currentQuestionIndex].option4}
            </label>
          </div> */}
        </div>
      )}
      {questions[currentQuestionIndex].options.length == 0 && (
        <div>
          <textarea
            id="message"
            value={textAreaValue}
            rows={rows}
            onChange={handleTextAreaChange}
            className="mt-5 block p-2.5 w-full text-sm text-spurple-300 rounded-lg border border-emerald-500 focus:ring-emerald-600 focus:border-emerald-600"
            placeholder="Write your answer here..."
            style={{ overflowY: "auto" }}
          ></textarea>
          <div className="mt-60 mb-10"></div>
        </div>
      )}
      <button className={buttonClass} onClick={nextQuestion}>
        <span className="block">&#x279c;</span>
      </button>
    </div>
  );
}
