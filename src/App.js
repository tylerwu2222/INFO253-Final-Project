import {useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./QuizComponents/Home";
import PreTest from "./QuizComponents/PreTest";
import Test from "./QuizComponents/Test";
import Result from "./QuizComponents/Result";
// import Api from "./QuizComponents/Api";


export const TestContext = createContext();

function App() {
  const [quizData, setQuizData] = useState([]);
  const [level, setLevel] = useState("Easy");
  const [numQuestions, setNumQuestions] = useState(4); 
  const [playerName, setPlayerName] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [hintVisibility, setHintVisibility] = useState(false);
  const time_alloted = 20;
  // initialize test Questions using API

  return (
    <TestContext.Provider
      value={{
        quizData,
        setQuizData,
        level,
        setLevel,
        numQuestions,
        setNumQuestions,
        playerName,
        setPlayerName,
        playerScore,
        setPlayerScore,
        time_alloted,
        hintIndex,
        setHintIndex,
        hintVisibility,
        setHintVisibility
      }}
    >
      {/* <Api /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/pretest" element={<PreTest />}></Route>
          <Route exact path="/test" element={<Test />}></Route>
          <Route exact path="/result" element={<Result />}></Route>
        </Routes>
      </Router>
    </TestContext.Provider>
  );

}

export default App;
