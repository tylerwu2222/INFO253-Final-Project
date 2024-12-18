import { useState, useContext } from "react";
// import { TestContext } from "./Test";

const RadioResponse = ({responseNumber, responseText}) => {
    const [isChecked, setIsChecked] = useState(false);
    // const [setUserResponse] = useContext(TestContext);
    const label_id = "question" + String(responseNumber);
    return (
        <>
          <label key={'label' + String(responseNumber)} htmlFor={label_id}>{String(responseNumber) + '. ' + responseText}</label>
          <input key={'input' + String(responseNumber)} type='radio' id={label_id} name="responseInputs" value={responseText} checked={isChecked} onChange={()=>{
            setIsChecked(!isChecked)
            if (isChecked){
                
                // setUserResponse(responseNumber);
            }
            }}></input><br />
        </>);
}

export default RadioResponse;