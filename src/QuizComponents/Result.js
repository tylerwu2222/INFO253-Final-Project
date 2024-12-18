import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../App";
// import { Alert, Table, Button } from "react-bootstrap";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Result.css";

const Result = () => {
  // Get quizData, playerName, playerScore from TestContext
  const { quizData, numQuestions, playerName, playerScore, setPlayerScore } =
    useContext(TestContext);

  // Get questions, correct_responses, user_responses from quizData
  const questions = quizData.map((d) => d.questionTitle);
  console.log(questions);
  const correct_responses = quizData.map((d) => d.correctAnswer);
  console.log(correct_responses);
  const user_responses = quizData.map((d) => d.userAnswer);
  console.log(user_responses);

  // create a list for mapping
  const table_body = [];
  for (var i = 0; i < numQuestions; i++) {
    const row = {
      index: i + 1,
      question: questions[i],
      correct_response: correct_responses[i],
      user_response: user_responses[i],
    };
    table_body.push(row);
  }

  // useNavigate hook to return to the home page
  const navigate = useNavigate();

 
  // const Navigate = () => {
  //   // update user score to zerp
  //   const navigate = useNavigate("/");
  //   setPlayerScore(0);
  //   // then go to next question
    
  // }


  return (
    <>
      {/* <Alert variant="success">
        Congratulations, {playerName}! You have finished the game!
      </Alert> */}

      <div className="result-div">
        <h1>Hi, {playerName}</h1>
        <h1>
          Your total score: {playerScore}/{numQuestions}
        </h1>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><b>Quiz #</b></TableCell>
                <TableCell align="right"><b>Question</b></TableCell>
                <TableCell align="right"><b>Correct Answer</b></TableCell>
                <TableCell align="right"><b>Your Answer</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table_body.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.index}</TableCell>
                  <TableCell align="right">{row.question}</TableCell>
                  <TableCell align="right">{row.correct_response}</TableCell>
                  <TableCell align="right">{row.user_response}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Button 
        variant="info" 
        onClick={() => {
          setPlayerScore(0);
          navigate("/pretest");
        }}
        >
          Restart
        </Button>
        <Button 
        variant="outline-success"
        onClick={() => {
          setPlayerScore(0);
          navigate("/");
        }}
        >Exit</Button>

        <div className="img-div">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/04/21/00/fireworks-1953253_1280.jpg"
            alt="fireworks going off in the sky"
          />
        </div>
      </div>
    </>
  );
};

export default Result;
