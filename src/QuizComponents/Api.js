import { useContext } from "react";
import { TestContext } from "../App";
import React, { useEffect, useState } from "react";
import "./Api.css";

function Api() {
  // const [quizData, setquizData] = useState([]);
  const {quizData, setQuizData} = useContext(TestContext);

  const formatData = (data) => {
    console.log('data')
    let formatted_data = data.map((d, i) => {
      d['questionNumber'] = i;
      d['userAnswer'] = '';
      d['allAnswers'] = d['incorrectAnswers'].concat(d['correctAnswer'])
      // randomize order of answers
      d['allAnswers'] = d['allAnswers'].sort(() => Math.random() - 0.5)
      // store correct answer as index
      d['correctAnswerIndex'] = d['allAnswers'].indexOf(d['correctAnswer']);
      d['questionTitle'] = d['question'];
      delete d['question'];
      return d;
    });
    console.log('fd', formatted_data);
    return formatted_data;
  };

  const fetchData = () => {
    return fetch("https://the-trivia-api.com/api/questions")
      .then(response => response.json())
      .then(data => formatData(data))
      .then(data => setQuizData(data));
  }



  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {/* <h1 className="text-color">Questions</h1>
      <ul className="background-color">
        {quizData && quizData.length > 0 && quizData.map((quizDataObj, index) => {
          return (<li key={quizDataObj.id}>{quizDataObj.questionTitle}</li>)
        })}
      </ul> */}
    </>
  );
}

export default Api;
