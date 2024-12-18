import { useState, useContext } from "react";
import './Hint.css';
import { Button } from '@mui/material'
import { TestContext } from "../App";

const Hint = ({ incorrectResponses }) => {
    const {hintIndex, hintVisibility, setHintVisibility} = useContext(TestContext);

    const getHint = () => {
        const incorrectResp = incorrectResponses[hintIndex];
        // console.log('IR', hintIndex, incorrectResp);
        return ("'" + incorrectResp + "' is not the answer");
    }

    return (
        <>
            <Button variant="outlined"
                style={{
                    color: "#4F46E5",
                    borderRadius: "15px",
                    borderColor: "#4F46E5"
                    // padding: "18px 36px",
                    // fontSize: "18px"
                }}
                onClick={() => { setHintVisibility(!hintVisibility) }}>Hint</Button>
            {/* <input type="button" onClick={() => { setHintVisibility(!hintVisibility) }} value="hint"></input> */}
            <p className={hintVisibility ? undefined : 'hidden'}>{getHint()}</p>
        </>
    );
};

export default Hint;