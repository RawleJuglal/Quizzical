import React from 'react'
import './Question.css'

export default function Question(props){
    const selectedStyle = {backgroundColor:'#D6DBF5'}
    const correctStyle = {backgroundColor:'#94D7A2', border:'none'}
    const incorrectStyle = {backgroundColor:'#F8BCBC', border:'none'}
    // const choicesList = [...props.question.incorrectAnswers]
    // choicesList.splice(Math.floor(Math.random()*4),0,props.question.correctAnswer)

    const choicesBtns = props.question.allAnswers.map((ele,index, array)=>{
        return <button 
                    className='--question-btn btn'
                    style={props.mechanics.isCompleted && 'cid' in ele ? correctStyle : props.mechanics.isCompleted && ele.isSelected ? incorrectStyle : !props.mechanics.isCompleted && ele.isSelected ? selectedStyle : {backgroundColor:'transparent'}} 
                    key={'badID' in ele ? ele.badID : ele.cid}
                    name={props.question.questionID}
                    id={'badID' in ele ? ele.badID : ele.cid} 
                    onClick={(event, id)=>{props.toggleSelection(event, event.target.id)}}
                    >{ele.answer}</button>
    })

    //isCompleted is true && 'cid' in ele ? correctStyle : isCompleted is true && ele.isSelected ? incorrectStyle : !isCompleted && ele.isSelected ? selectedStyle : backgroundColor:'buttonface'
    

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