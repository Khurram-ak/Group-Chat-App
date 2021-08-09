import "./index.css"
import { useState, useEffect } from "react"

function Question(props) {
    // const [allOptions, setAllOptions] = useState([])
    console.log("props", props.question);
   
    
    // useEffect(() => {
    //     setAllOptions([...allOptions,props.question.incorrect_answers.push(props.question.correct_answer)])
    //     //  allOptions.sort()
    // }, [])
    
    
    //   ,[]>> dependancy array: jab bhi yeh change huga  useEffect chalega
    
    let allOptions = [props.question.correct_answer]
    props.question.incorrect_answers.map(item => { return allOptions.push(item); });
    allOptions.sort()
    
    console.log("allOptions", allOptions);
    // console.log("allOptions",allOptions);

    return <>

        <div className="question">
            <h3>Question {props.index + 1} </h3>
            <p>{props.question.question}</p>
            <span> {allOptions?.map(item => {
                return <>
                    <div className={"inputBox"}>
                        <input
                            type="radio"
                            key={Math.random()}
                            name={props.index}
                            value={item}
                            onChange={(e) => { props.option(e.target.value); }}
                        />
                        {`  ${item}`}
                        <br></br>
                    </div>
                </>
            })}</span>

        </div>

    </>


}
export default Question;







