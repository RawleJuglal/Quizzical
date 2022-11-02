import React from 'react'
import './Question.css'

export default function Question(props){
    const choicesList = [...props.data.incorrect_answers]
    choicesList.splice((Math.floor(Math.random() * 4)), 0, props.data.correct_answer)

    const choiceBtn = choicesList.map((val, index)=>{
        let newVal = convertString(val)
        return <button className={ "btn option" + (index +1)} key={"option" + (index +1)} id={val}>{newVal}</button>
    })

    function convertString(string){
        return string.replace(/&(lt|gt|quot|#039|amp);/g, function (m, p) { 
          return (p == "lt") ? "<" : (p == "gt") ? ">" : (p == "#039") ? "'" : ((p == "amp") ? "&" : '"');
        });
      
    }

    return(
        <div className='--question-container'>
            <p className='--question-question'>{convertString(props.data.question)}</p> 
            {/* <ul className='--question-answer-list'>   
                {choiceBtn}
            </ul> */}
            <div className='--question-choices-container'>
                {choiceBtn}
            </div>
        </div>
    ) 
}

// category
// : 
// "Art"
// correct_answer
// : 
// "Andy Warhol"
// difficulty
// : 
// "medium"
// id
// : 
// "g_3AwkJyEfE8RWkaQ5qVg"
// incorrect_answers
// : 
// (3) ['Roy Lichtenstein', 'David Hockney', 'Peter Blake']
// question
// : 
// "Which artist&rsquo;s studio was known as &#039;The Factory&#039;?"
// type
// : 
// "multiple"