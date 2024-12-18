import { useContext } from "react";
import { Link } from "react-router-dom";
import { TestContext } from "../App";
import './PreTest.css'
import Api from "./Api";


const PreTest = () => {
    const {
        playerName,
        level,
        numQuestions,
        time_alloted
    } = useContext(TestContext);

    return (
        <>
        <Api />
        <div className="pre-test-div">
            <p>
                {playerName}, since you selected a difficulty of <b>{level}</b>, there will be <b>{numQuestions}</b> multiple-choice questions,
                and you will have <b>{time_alloted} seconds</b> to answer each one.
                Press start when you are ready to begin!
            </p>
            <Link to={'/test'}>
                <input type="button" id="start-test-btn" value="Start" />
            </Link>
        </div>
        </>
    )
}

export default PreTest;