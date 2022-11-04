import React from 'react'
import './Question.css'

export default function Question(props){
    const selectedStyle = {backgroundColor:'green'}
    const choicesList = [...props.question.incorrectAnswers]
    choicesList.splice(Math.floor(Math.random()*4),0,props.question.correctAnswer)
    const choicesBtns = choicesList.map((ele,index, array)=>{
        return <button 
                    style={ele.isSelected ? selectedStyle : {backgroundColor:'buttonface'}} 
                    key={'badID' in ele ? ele.badID : ele.cid}
                    name={props.question.questionID}
                    id={'badID' in ele ? ele.badID : ele.cid} 
                    onClick={(event, id)=>{props.toggleSelection(event, event.target.id)}}
                    >{ele.answer}</button>
    })
    

    return(
        <div className='--question-container'>
            <p className='--question-question' id={props.question.questionID}>{props.question.question}</p> 

            <div className='--question-choices-container'>
                {choicesBtns}
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