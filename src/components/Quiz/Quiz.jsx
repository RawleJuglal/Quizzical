import React from 'react'
import './Quiz.css'
import Question from '../Question/Question'

export default function Quiz(props){
    const questionList = props.game.questions.map((ele)=>{
        return <Question key={ele.questionID} question={ele} toggleSelection={props.clickBtn}/>
    })

    return(
        <div className='--quiz-form-container'>
            <form onSubmit={!props.game.mechanics.isSubmitted ? props.clickSubmit : props.newQuiz}>
                {questionList}
                {props.game.mechanics.isSubmitted ? <button>Take New Quiz</button> : <button onClick={props.clickSubmit} type="submit">Submit</button>}
            </form>
        </div>
    )
}