import "./Home.css";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TestContext } from "../App";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import Test from "./Test";


function Home() {
    const { 
        level,
        setLevel,
        setNumQuestions,
        setPlayerName,
        playerName,
        time_alloted
    } = useContext(TestContext);
    const [error, setError] = useState(false);

    // update player's name as user changes name field
    const handleNameChange = (e) => {
        setPlayerName(e.target.value);
        setError(false);
    }

    // change difficulty as user selects new 
    const onClickRadio = (e) => {
        setLevel(e.currentTarget.value);
        selectNumQuestions(e.currentTarget.value);
    }

    // sets number of questions based on difficulty
    const selectNumQuestions = (level) => {
        if (level === "Easy")
            // setTimer(30);
            setNumQuestions(4);
        else if (level === "Medium")
            setNumQuestions(7);
        else if (level === "Difficult")
            setNumQuestions(10);
    }

    // shows error if empty name
    const handleSubmit = (e) => {
        // empty name --> show error
        if (playerName === "") {
            e.preventDefault();
            setError(true);
        }
    }

    return (
        <>
            <head lang="en">
                <meta charset="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body>
                <div className="grid_container">
                    <div className="item1">
                        <h1 className="heading">QuizUp</h1>
                        <p className="sub">A quick quiz break from the monotony of life. Let’s put those brain cells to test!</p>
                        <p className="questions">What's your name?</p>
                        <input type="text" id="name" name="Name" placeholder="Jane Doe" value={playerName} onChange={(e) => handleNameChange(e)} required className="questions" /><br />
                        {error && <span style={{ color: "red" }} className="questions">Name field cannot be empty.</span>}
                        <p className="questions">Select difficulty level</p>
                        <input type="radio" name="Level" value="Easy" onClick={onClickRadio} defaultChecked />Easy <br />
                        <input type="radio" name="Level" value="Medium" onClick={onClickRadio} />Medium<br />
                        <input type="radio" name="Level" value="Difficult" onClick={onClickRadio} />Difficult<br />
                        <div id="formsubmitbutton">
                            <button onClick={() => { alert('1. There is only one right answer for each question. 2. There will be (4), (7), or (10) questions depending on difficulty. 3. You will have ' + time_alloted + ' seconds for each question.'); }} className="buttonone">Read Instructions</button>
                            <Link to={'/pretest'}>
                                <input type="button" id="Submit" onClick={handleSubmit} value="Submit" className="buttonone buttontwo" />
                            </Link>
                        </div>
                    </div>
                    <div className="item2">
                        <img src="https://i.ibb.co/VJGcsdL/image-frame.png" alt="image-frame" border="0" />
                    </div>

                </div>
            </body>
        </>
    )
};
export default Home;
