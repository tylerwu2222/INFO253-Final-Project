import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Test.css'
import Hint from "./Hint";
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material'
import { TestContext } from "../App";


function Test() {
  const {
    quizData,
    setQuizData,
    playerName,
    numQuestions,
    playerScore,
    setPlayerScore,
    time_alloted,
    setHintIndex,
    setHintVisibility
  } = useContext(TestContext);

  const [timeLeft, setTimeLeft] = useState(time_alloted);

  const questions = quizData.map(d => d.questionTitle);
  const question_responses = quizData.map(d => d.allAnswers);
  const correct_responses = quizData.map(d => d.correctAnswerIndex);
  const incorrect_responses = quizData.map(d => d.incorrectAnswers);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState(questions[questionNumber])
  const [questionResponses, setQuestionResponses] = useState(question_responses[questionNumber])
  // userResp 0 returns null for some reason...
  const [userResponseIndex, setUserResponseIndex] = useState(null); // from 0 to 3
  const [userResponse, setUserResponse] = useState(''); // the actual text of the response
  const [correctResponseIndex, setCorrectResponseIndex] = useState(correct_responses[questionNumber]); // from 0 to 3
  const [incorrectResponses, setIncorrectResponse] = useState(incorrect_responses[questionNumber]);
  const [noResponseVisibility, setNoResponseVisibility] = useState(false);


  const navigate = useNavigate();

  // score display
  const DisplayNameScore = () => {
    return (
      <>
        <p>{playerName} 's Current Score {playerScore}/{questionNumber}</p>
      </>
    )
  }

  // timer display
  const DisplayTimer = () => {
    return (
      <>
        <p>{timeLeft} seconds left</p>
      </>
    )
  }

  // The question component
  const QuestionText = () => {
    return (
      <>
        <h3>Q{questionNumber + 1}. {question}</h3>
      </>
    )
  }

  // update (text of) userResponse when userResponseIndex changes
  useEffect(() => {
    setUserResponse(questionResponses[userResponseIndex]);
  }, [userResponseIndex]);

  // updates user score based on userResponseIndex
  const updateScore = () => {
    // update score
    if (userResponseIndex === correctResponseIndex) {
      setPlayerScore(playerScore + 1);
    }
    // then update quizData's userResponseIndex
    setQuizData(quizData.map((d, i) => {
      if (i == questionNumber) {
        return {
          ...d,
          'userAnswer': userResponse
        }
      }
      else {
        return d;
      }
    }));
    // console.log('new user response', quizData);
  }

  // update question, responses, error, timer, etc. when question number changes
  useEffect(() => {
    setQuestion(questions[questionNumber]);
    setQuestionResponses(question_responses[questionNumber]);
    setCorrectResponseIndex(correct_responses[questionNumber]);
    setIncorrectResponse(incorrect_responses[questionNumber]);

    // reset other parameters
    setUserResponseIndex(null);
    setNoResponseVisibility(false);
    setTimeLeft(time_alloted);
    setHintIndex(Math.floor(Math.random() * 3));
    setHintVisibility(false);
  }, [questionNumber]);

  // create timer using useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    // clear when timer unmounts (new page)
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // randomize hint index
  useEffect(() => {
    setHintIndex(Math.floor(Math.random() * 3));
  }, []);

  // response warning for when user tries to submit without selecting a response
  const NoResponseWarning = () => {
    return (
      <div>
        <p className={noResponseVisibility ? 'no-response-warning' : 'no-response-warning hidden'}>Please enter a response. (If you don't know just guess!)</p>
      </div>
    )
  }

  // handle user going to next question
  const goNextQuestion = () => {
    // update user score first
    updateScore();
    // then go to next question
    setQuestionNumber(questionNumber + 1)
  }

  // handles going to next page via submit
  const handleSubmit = event => {
    event.preventDefault();
    // if blank, don't submit, set error
    if (userResponseIndex == null) {
      setNoResponseVisibility(true);
    }
    // otherwise go next page
    else {
      // if not last question, go next question
      if (questionNumber < numQuestions - 1) {
        // increment quetion, tally score, and reset parameters
        goNextQuestion();
      }
      // else, go to response page
      else {
        updateScore();
        navigate('/result');
      }
    }
  };

  // handles going to next page when timer reaches 0
  useEffect(() => {
    if (timeLeft == 0) {
      // if not last quetion, go next question
      if (questionNumber < numQuestions - 1) {
        goNextQuestion();
      }
      // else, go to results page
      else {
        updateScore();
        navigate('/result');
      }
    }
  }, [timeLeft]);

  // the response buttons
  const ResponseContent = ({ type }) => {
    return (
      <div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={e => {setUserResponseIndex(questionResponses.indexOf(e.target.value))}}
          >
            {
              questionResponses.map((r, i) => {
                return <FormControlLabel key={"response" + i} value={r} control={<Radio checked={userResponse == r} />} label={r} />
              })
            }
          </RadioGroup>
          <Button type="submit" style={{
            backgroundColor: "#4F46E5",
            borderRadius: "15px"
          }} variant="contained" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </FormControl>
      </div>)
  };

  // the response form
  const ResponseForm = ({ type = "radio" }) => {
    return (
      <>
        < ResponseContent type={type} />
      </>
    )
  }

  return (
    <>
      
      <div className="score-bar">
        <DisplayNameScore name="tyler" />
        <DisplayTimer time={timeLeft} />
      </div>
      <div className="questions-div">
        <QuestionText />
        <NoResponseWarning />
        <ResponseForm /><br />
        <Hint incorrectResponses={incorrectResponses} />
      </div>
    </>
    // </TestContext.Provider>
  );
}

export default Test;
